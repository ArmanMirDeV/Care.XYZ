'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaBaby, FaUserFriends, FaHeartbeat, FaCheckCircle, FaClock, FaDollarSign } from 'react-icons/fa';
import Link from 'next/link';
import toast from 'react-hot-toast';

const serviceDetails = {
  'baby-care': {
    id: 'baby-care',
    title: 'Baby Care Service',
    description: 'Professional and caring babysitting services for your little ones. Our trained caregivers provide safe, nurturing environments for children of all ages.',
    icon: FaBaby,
    color: 'bg-blue-500',
    features: [
      'Experienced and certified babysitters',
      'Age-appropriate activities and care',
      'Meal preparation and feeding assistance',
      'Safe and secure environment',
      'Flexible scheduling options',
    ],
    charge: 500, // per hour
  },
  'elderly-care': {
    id: 'elderly-care',
    title: 'Elderly Care Service',
    description: 'Compassionate care services for elderly family members. Our caregivers provide assistance with daily activities, medication management, and companionship.',
    icon: FaUserFriends,
    color: 'bg-green-500',
    features: [
      'Trained elderly care specialists',
      'Medication management',
      'Assistance with daily activities',
      'Companionship and emotional support',
      'Health monitoring',
    ],
    charge: 600, // per hour
  },
  'sick-care': {
    id: 'sick-care',
    title: 'Sick People Care Service',
    description: 'Specialized care for sick or recovering family members. Our caregivers provide medical support, comfort, and assistance during recovery periods.',
    icon: FaHeartbeat,
    color: 'bg-red-500',
    features: [
      'Medical care assistance',
      'Medication administration',
      'Post-surgery care',
      'Health monitoring and reporting',
      'Comfort and emotional support',
    ],
    charge: 700, // per hour
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params?.service_id;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const service = serviceDetails[serviceId];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        setIsAuthenticated(!!data.user);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  const handleBookService = () => {
    if (isAuthenticated) {
      router.push(`/booking/${serviceId}`);
    } else {
      router.push(`/login?redirect=/booking/${serviceId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <div className={`${service.color} w-20 h-20 rounded-full flex items-center justify-center mb-6`}>
                <Icon className="text-white text-4xl" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
              <p className="text-lg text-gray-600 mb-8">{service.description}</p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Features</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheckCircle className="text-green-500 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FaDollarSign className="text-green-600 w-6 h-6 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {service.charge} BDT
                  </span>
                  <span className="text-gray-600 ml-2">/ hour</span>
                </div>
              </div>

              <button
                onClick={handleBookService}
                className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Book Service Now
              </button>
            </div>

            <div className="md:w-1/2 bg-gradient-to-br from-blue-50 to-blue-100 p-8 md:p-12 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className={`${service.color} w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <Icon className="text-white text-6xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional Care</h3>
                <p className="text-gray-600">Trusted and reliable service for your loved ones</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

