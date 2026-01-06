'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
            <Image 
              src="/care-xyz-logo.png" 
              alt="Care.xyz Logo" 
              width={50} 
              height={50} 
              className="h-12 w-auto object-contain"
            />
            <span className="text-3xl font-bold text-purple-600">Care.xyz</span>
          </Link>
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
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all shadow-md font-semibold"
        >
          <FaHome className="w-5 h-5 mr-2" />
          Return to Home
        </Link>
        </motion.div>
      </div>
    </div>
  );
}

