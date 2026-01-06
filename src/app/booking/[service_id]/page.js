'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import PrivateRoute from '@/components/PrivateRoute';
import { FaMapMarkerAlt, FaClock, FaDollarSign, FaArrowRight, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { calculateTotalCost, formatCurrency } from '@/lib/utils';

const divisions = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];
const districts = {
  'Dhaka': ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail'],
  'Chittagong': ['Chittagong', 'Cox\'s Bazar', 'Comilla'],
  'Sylhet': ['Sylhet', 'Moulvibazar', 'Habiganj'],
  'Rajshahi': ['Rajshahi', 'Bogra', 'Pabna'],
  'Khulna': ['Khulna', 'Jessore', 'Satkhira'],
  'Barisal': ['Barisal', 'Patuakhali', 'Bhola'],
  'Rangpur': ['Rangpur', 'Dinajpur', 'Nilphamari'],
  'Mymensingh': ['Mymensingh', 'Jamalpur', 'Netrokona'],
};

import { serviceCharges } from '@/lib/services';

export default function BookingPage() {
  return (
    <PrivateRoute>
      <BookingContent />
    </PrivateRoute>
  );
}

function BookingContent() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params?.service_id;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    duration: 1,
    durationType: 'hours',
    division: '',
    district: '',
    city: '',
    area: '',
    address: '',
  });
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceCharge = serviceCharges[serviceId] || 500;
  const totalCost = calculateTotalCost(
    formData.duration,
    serviceCharge
  );

  useEffect(() => {
    if (formData.division) {
      setAvailableDistricts(districts[formData.division] || []);
      setFormData(prev => ({ ...prev, district: '', city: '', area: '' }));
    }
  }, [formData.division]);

  const handleNext = () => {
    if (step === 1) {
      if (!formData.duration || formData.duration < 1) {
        toast.error('Please enter a valid duration');
        return;
      }
    } else if (step === 2) {
      if (!formData.division || !formData.district || !formData.address) {
        toast.error('Please fill in all location fields');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId,
          ...formData,
          totalCost,
          serviceCharge,
          paymentMethod: 'Cash on Delivery',
        }),
      });

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format');
      }

      const data = await res.json();

      if (res.ok) {
        toast.success('Booking confirmed successfully!');
        router.push('/my-bookings');
      } else {
        toast.error(data.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Connection error. Please contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Service</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > s ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold text-gray-900">Select Duration</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration Type
                  </label>
                  <select
                    value={formData.durationType}
                    onChange={(e) => setFormData({ ...formData, durationType: e.target.value })}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-purple-500 focus:border-pink-500"
                  >
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Duration ({formData.durationType})
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 text-black py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-pink-500"
                  />
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Service Charge:</span>
                    <span className="font-semibold">{formatCurrency(serviceCharge)} / hour</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-700">Total Cost:</span>
                    <span className="text-xl font-bold text-purple-600">{formatCurrency(totalCost)}</span>
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all font-semibold shadow-md"
                >
                  Next <FaArrowRight className="ml-2" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold text-gray-900">Select Location</h2>
                <div className="grid grid-cols-1 text-black md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Division</label>
                    <select
                      value={formData.division}
                      onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-pink-500"
                    >
                      <option value="">Select Division</option>
                      {divisions.map((div) => (
                        <option key={div} value={div}>{div}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block  text-sm font-medium text-gray-700 mb-2">District</label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      disabled={!formData.division}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-pink-500 disabled:bg-gray-100"
                    >
                      <option value="">Select District</option>
                      {availableDistricts.map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-pink-500"
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-pink-500"
                      placeholder="Enter area"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows="3"
                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-pink-500"
                    placeholder="Enter complete address"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaArrowLeft className="mr-2" /> Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all font-semibold shadow-md"
                  >
                    Next <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold text-gray-900">Confirm Booking</h2>
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold text-black">{formData.duration} {formData.durationType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold text-black text-right">
                      {formData.division}, {formData.district}
                      <br />
                      {formData.city}, {formData.area}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-semibold text-black text-right">{formData.address}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-black">Total Cost:</span>
                      <span className="text-2xl font-bold text-purple-600">{formatCurrency(totalCost)}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <FaCheckCircle className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-blue-900 mb-1">Payment Method: Cash on Delivery</p>
                        <p className="text-sm text-blue-700">
                          You will pay {formatCurrency(totalCost)} BDT when the service provider arrives at your location.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => setStep(step - 1)}
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <FaArrowLeft className="mr-2" /> Back to Location
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all font-semibold shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Confirming...
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="mr-2" /> Confirm Booking
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

