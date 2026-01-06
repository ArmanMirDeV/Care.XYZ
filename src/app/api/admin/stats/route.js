import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDatabase();
    const bookingsCollection = db.collection('bookings');
    const usersCollection = db.collection('users');

    const [totalBookings, totalUsers, recentBookings] = await Promise.all([
      bookingsCollection.countDocuments(),
      usersCollection.countDocuments(),
      bookingsCollection
        .aggregate([
          {
            $lookup: {
              from: 'users',
              let: { userId: { $toObjectId: '$userId' } },
              pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$userId'] } } }
              ],
              as: 'userDetails'
            }
          },
          {
            $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true }
          },
          {
            $project: {
              _id: 1,
              serviceName: 1,
              totalCost: 1,
              status: 1,
              createdAt: 1,
              userName: '$userDetails.name',
              userEmail: '$userDetails.email',
            }
          },
          { $sort: { createdAt: -1 } },
          { $limit: 10 }
        ])
        .toArray()
    ]);

    // Calculate total revenue
    const revenueResult = await bookingsCollection.aggregate([
      { $match: { status: { $in: ['Confirmed', 'Completed'] } } },
      { $group: { _id: null, total: { $sum: '$totalCost' } } }
    ]).toArray();

    const totalRevenue = revenueResult[0]?.total || 0;

    return NextResponse.json({
      stats: {
        totalBookings,
        totalUsers,
        totalRevenue
      },
      recentBookings
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
