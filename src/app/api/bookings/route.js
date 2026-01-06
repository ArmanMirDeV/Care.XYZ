import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sendInvoiceEmail } from '@/lib/email';

const serviceNames = {
  'baby-care': 'Baby Care',
  'elderly-care': 'Elderly Care',
  'sick-care': 'Sick People Care',
};

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = await getDatabase();
    const bookingsCollection = db.collection('bookings');

    const bookings = await bookingsCollection
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error('Get bookings error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch bookings', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      serviceId,
      duration,
      durationType,
      division,
      district,
      city,
      area,
      address,
      totalCost,
      serviceCharge,
      paymentMethod,
    } = body;

    if (!serviceId || !duration || !division || !district || !address) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const bookingsCollection = db.collection('bookings');

    const booking = {
      userId: session.user.id,
      serviceId,
      serviceName: serviceNames[serviceId] || serviceId,
      duration: parseInt(duration),
      durationType,
      division,
      district,
      city: city || '',
      area: area || '',
      address,
      totalCost: parseFloat(totalCost),
      serviceCharge: parseFloat(serviceCharge),
      paymentMethod: paymentMethod || 'Cash on Delivery',
      status: 'Pending', // Booking starts as Pending, will be confirmed by admin
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await bookingsCollection.insertOne(booking);
    const bookingId = result.insertedId.toString();

    // Send invoice email
    try {
      await sendInvoiceEmail(session.user.email, {
        ...booking,
        bookingId,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the booking if email fails
    }

    return NextResponse.json(
      { message: 'Booking created successfully', booking: { ...booking, _id: result.insertedId } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create booking error:', error);
    return NextResponse.json(
      { message: 'Failed to create booking', error: error.message },
      { status: 500 }
    );
  }
}

