import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { message: 'Status is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const bookingsCollection = db.collection('bookings');

    // Verify booking belongs to user
    const booking = await bookingsCollection.findOne({
      _id: new ObjectId(id),
      userId: session.user.id,
    });

    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Update booking
    await bookingsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json(
      { message: 'Booking updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update booking error:', error);
    return NextResponse.json(
      { message: 'Failed to update booking', error: error.message },
      { status: 500 }
    );
  }
}

