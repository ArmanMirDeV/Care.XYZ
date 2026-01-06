'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCheckCircle, FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import BannerSlider from '@/components/BannerSlider';
import { services } from '@/lib/services';

const testimonials = [
  {
    name: 'Sarah Ahmed',
    text: 'Care.xyz helped me find an amazing caregiver for my mother. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Mohammad Rahman',
    text: 'The booking process was so easy and the service quality is excellent.',
    rating: 5,
  },
  {
    name: 'Fatima Khan',
    text: 'Found a perfect babysitter for my kids. The platform is trustworthy and reliable.',
    rating: 5,
  },
];

export default function Home() {
  const [stats, setStats] = useState({ bookings: 0, users: 0, services: 0 });

  useEffect(() => {
    // Fetch stats from API
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {
        // Default stats if API fails
        setStats({ bookings: 1250, users: 850, services: 3 });
      });
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Banner Slider */}
      <BannerSlider />

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { label: 'Total Bookings', value: stats.bookings, icon: '📋' },
              { label: 'Happy Users', value: stats.users, icon: '👥' },
              { label: 'Services', value: stats.services, icon: '🏥' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-purple-600 mb-1">{stat.value}+</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Care.xyz
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Care.xyz is a web application that provides reliable and trusted care services 
              for children, elderly, and other family members. Our platform allows users to 
              easily find and hire caretakers for different purposes such as babysitting, 
              elderly care, or special care at home. We make caregiving easy, secure, and 
              accessible for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600">
              Choose from our range of professional care services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.slice(0, 8).map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                    <Icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link
                    href={`/service/${service.id}`}
                    className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all"
                  >
                    Learn More
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all font-semibold shadow-md"
            >
              View All {services.length} Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-700 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Book a care service today and experience the difference
            </p>
            <Link
              href="/services"
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors shadow-lg"
            >
              Book Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
