'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { services } from '@/lib/services';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-lg text-gray-600">
            Choose from our range of professional care services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                  <Icon className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <div className="mb-6">
                  <span className="text-2xl font-bold text-purple-600">{service.charge} BDT</span>
                  <span className="text-gray-600 ml-2">/ hour</span>
                </div>
                <Link
                  href={`/service/${service.id}`}
                  className="block text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all shadow-md"
                >
                  View Details
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

