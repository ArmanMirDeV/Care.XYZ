'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  FaHome, 
  FaUser, 
  FaSignInAlt, 
  FaBars, 
  FaTimes,
  FaClipboardList 
} from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isLoggedIn = status === 'authenticated' && !!session;

  const navLinks = [
    { href: '/', label: 'Home', icon: FaHome },
    { href: '/services', label: 'Services', icon: FaHome },
  ];

  if (isLoggedIn) {
    navLinks.push({ href: '/my-bookings', label: 'My Bookings', icon: FaClipboardList });
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/care-xyz-logo.png" 
              alt="Care.xyz Logo" 
              width={40} 
              height={40} 
              className="h-10 w-auto object-contain"
              priority
            />
            <span className="text-2xl font-bold text-purple-600">Care.xyz</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-700 hover:text-pink-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {isLoggedIn ? (
              <button
                onClick={async () => {
                  await signOut({ callbackUrl: '/login' });
                }}
                className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <FaUser className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <FaSignInAlt className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md hover:from-purple-700 hover:to-pink-600 transition-all font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100"
          >
            {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'bg-purple-50 text-purple-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t">
                {isLoggedIn ? (
                  <button
                    onClick={async () => {
                      setIsOpen(false);
                      await signOut({ callbackUrl: '/login' });
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    <FaUser className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                    >
                      <FaSignInAlt className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="block mt-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md text-center hover:from-purple-700 hover:to-pink-600 font-semibold"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

