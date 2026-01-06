import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status');

    const db = await getDatabase();
    const bookingsCollection = db.collection('bookings');

    // Build match query
    const matchQuery = {};
    if (status) {
      matchQuery.status = status;
    }

    const payments = await bookingsCollection
      .aggregate([
        {
          $match: {
            ...matchQuery,
            paymentIntentId: { $exists: true, $ne: null },
          },
        },
        {
          $lookup: {
            from: 'users',
            let: { userId: { $toObjectId: '$userId' } },
            pipeline: [
              { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
            ],
            as: 'userDetails',
          },
        },
        {
          $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true },
        },
        {
          $project: {
            _id: 1,
            paymentIntentId: 1,
            serviceName: 1,
            totalCost: 1,
            serviceCharge: 1,
            status: 1,
            createdAt: 1,
            userName: '$userDetails.name',
            userEmail: '$userDetails.email',
            userContact: '$userDetails.contact',
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: limit },
      ])
      .toArray();

    // Calculate summary stats
    const summary = await bookingsCollection.aggregate([
      {
        $match: {
          paymentIntentId: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: null,
          totalPayments: { $sum: 1 },
          totalAmount: { $sum: '$totalCost' },
          confirmedAmount: {
            $sum: {
              $cond: [{ $in: ['$status', ['Confirmed', 'Completed']] }, '$totalCost', 0],
            },
          },
        },
      },
    ]).toArray();

    return NextResponse.json({
      payments,
      summary: summary[0] || { totalPayments: 0, totalAmount: 0, confirmedAmount: 0 },
    });
  } catch (error) {
    console.error('Admin payments error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

