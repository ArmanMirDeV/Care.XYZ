'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaClipboardList, FaMoneyBillWave, FaCheckCircle, FaHourglassHalf, FaCreditCard } from 'react-icons/fa';
import { formatCurrency, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalBookings: 0, totalUsers: 0, totalRevenue: 0 });
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState({ totalPayments: 0, totalAmount: 0, confirmedAmount: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAdminData();
    fetchPaymentHistory();
  }, []);

  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (res.ok) {
        setStats(data.stats);
        setBookings(data.recentBookings);
      }
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const res = await fetch('/api/admin/payments?limit=100');
      const data = await res.json();
      if (res.ok) {
        setPayments(data.payments);
        setPaymentSummary(data.summary);
      }
    } catch (error) {
      toast.error('Failed to load payment history');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<FaClipboardList className="text-purple-600" />} 
          title="Total Bookings" 
          value={stats.totalBookings} 
          color="bg-purple-100"
        />
        <StatCard 
          icon={<FaUsers className="text-pink-600" />} 
          title="Registered Users" 
          value={stats.totalUsers} 
          color="bg-pink-100"
        />
        <StatCard 
          icon={<FaMoneyBillWave className="text-green-600" />} 
          title="Total Revenue" 
          value={`${formatCurrency(stats.totalRevenue)} BDT`} 
          color="bg-green-100"
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'overview'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-4 text-sm font-medium border-b-2 flex items-center space-x-2 ${
                activeTab === 'payments'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaCreditCard className="w-4 h-4" />
              <span>Payment History</span>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Booking ID</th>
                      <th className="px-6 py-3 font-semibold">User</th>
                      <th className="px-6 py-3 font-semibold">Service</th>
                      <th className="px-6 py-3 font-semibold">Amount</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                      <th className="px-6 py-3 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                          No bookings found
                        </td>
                      </tr>
                    ) : (
                      bookings.map((booking) => (
                        <tr key={booking._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-mono text-xs text-gray-500">{booking._id}</td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{booking.userName || 'Unknown'}</div>
                            <div className="text-xs text-gray-500">{booking.userEmail}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{booking.serviceName}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-purple-600">{formatCurrency(booking.totalCost)}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                              booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                              booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{formatDate(booking.createdAt)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              {/* Payment Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Payments</p>
                  <p className="text-2xl font-bold text-purple-600">{paymentSummary.totalPayments}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(paymentSummary.totalAmount)} BDT</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Confirmed Amount</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(paymentSummary.confirmedAmount)} BDT</p>
                </div>
              </div>

              {/* Payment History Table */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                      <tr>
                        <th className="px-6 py-3 font-semibold">Payment ID</th>
                        <th className="px-6 py-3 font-semibold">User</th>
                        <th className="px-6 py-3 font-semibold">Service</th>
                        <th className="px-6 py-3 font-semibold">Amount</th>
                        <th className="px-6 py-3 font-semibold">Service Charge</th>
                        <th className="px-6 py-3 font-semibold">Status</th>
                        <th className="px-6 py-3 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {payments.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                            No payment records found
                          </td>
                        </tr>
                      ) : (
                        payments.map((payment) => (
                          <tr key={payment._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-mono text-xs text-gray-500">
                              {payment.paymentIntentId?.substring(0, 20)}...
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">{payment.userName || 'Unknown'}</div>
                              <div className="text-xs text-gray-500">{payment.userEmail}</div>
                              {payment.userContact && (
                                <div className="text-xs text-gray-400">{payment.userContact}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">{payment.serviceName}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-purple-600">
                              {formatCurrency(payment.totalCost)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {formatCurrency(payment.serviceCharge || 0)}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                payment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                                payment.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                payment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {payment.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{formatDate(payment.createdAt)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className={`p-4 rounded-full ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
