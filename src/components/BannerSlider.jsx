'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80',
    title: 'Trusted Care Services',
    subtitle: 'For Your Loved Ones',
    description: 'Making caregiving easy, secure, and accessible for everyone',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80',
    title: 'Professional Baby Care',
    subtitle: 'Safe & Nurturing Environment',
    description: 'Experienced caregivers for your little ones',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=1920&q=80',
    title: 'Compassionate Elderly Care',
    subtitle: 'Dignity & Respect',
    description: 'Dedicated care for your elderly family members',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1920&q=80',
    title: 'Specialized Medical Care',
    subtitle: 'Recovery & Support',
    description: 'Professional care for sick or recovering family members',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1920&q=80',
    title: '24/7 Care Support',
    subtitle: 'Always There For You',
    description: 'Round-the-clock care when you need it most',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1920&q=80',
    title: 'Trusted by Families',
    subtitle: 'Your Peace of Mind',
    description: 'Join thousands of satisfied families who trust Care.xyz',
  },
];

export default function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section 
      className="relative h-[600px] md:h-[700px] overflow-hidden max-w-7xl mx-auto rounded-lg shadow-lg "
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              sizes="100vw"
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 " />
            
            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center text-white"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                    {slides[currentIndex].title}
                  </h1>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-pink-200">
                    {slides[currentIndex].subtitle}
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 text-purple-50 max-w-3xl mx-auto">
                    {slides[currentIndex].description}
                  </p>
                  <Link
                    href="/services"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-600 transition-all shadow-lg"
                  >
                    Book a Service
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
        aria-label="Next slide"
      >
        <FaChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

