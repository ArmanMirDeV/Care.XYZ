'use client';

import { useState, useEffect } from 'react';
import PrivateRoute from '@/components/PrivateRoute';
import { motion } from 'framer-motion';
import { FaClock, FaCheckCircle, FaTimesCircle, FaEye, FaTrash } from 'react-icons/fa';
import { formatDate, formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Confirmed: 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}

function MyBookingsContent() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (res.ok) {
        setBookings(data.bookings || []);
      }
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Cancelled' }),
      });

      if (res.ok) {
        toast.success('Booking cancelled successfully');
        fetchBookings();
      } else {
        toast.error('Failed to cancel booking');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">You don't have any bookings yet.</p>
            <a
              href="/services"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book a Service
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {booking.serviceName || booking.serviceId}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          statusColors[booking.status] || statusColors.Pending
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <FaClock className="w-5 h-5 mr-2" />
                        <span>
                          {booking.duration} {booking.durationType}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-semibold text-gray-900">Total Cost: </span>
                        <span className="ml-2 text-blue-600 font-bold">
                          {formatCurrency(booking.totalCost)}
                        </span>
                      </div>
                      <div className="flex items-start text-gray-600 col-span-1 md:col-span-2">
                        <span className="font-medium mr-2">Location:</span>
                        <span>
                          {booking.division}, {booking.district}
                          {booking.city && `, ${booking.city}`}
                          {booking.area && `, ${booking.area}`}
                        </span>
                      </div>
                      <div className="flex items-start text-gray-600 col-span-1 md:col-span-2">
                        <span className="font-medium mr-2">Address:</span>
                        <span>{booking.address}</span>
                      </div>
                      {booking.createdAt && (
                        <div className="text-sm text-gray-500">
                          Booked on: {formatDate(booking.createdAt)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4 md:mt-0 md:ml-4">
                    {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                      >
                        <FaTrash className="w-4 h-4 mr-2" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

