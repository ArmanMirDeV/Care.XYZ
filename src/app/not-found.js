'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mb-8">
          <FaExclamationTriangle className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaHome className="w-5 h-5 mr-2" />
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
}

