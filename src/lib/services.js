// Centralized services configuration
import {
  FaBaby,
  FaUserFriends,
  FaHeartbeat,
  FaPaw,
  FaBroom,
  FaUtensils,
  FaTshirt,
  FaSeedling,
  FaGraduationCap,
  FaHandHoldingHeart,
  FaUserNurse,
  FaBandAid,
  FaBrain,
  FaChild,
  FaWheelchair,
  FaTools,
  FaShoppingCart,
  FaPills,
  FaCar,
  FaUsers,
  FaBed,
  FaHeart,
  FaAmbulance,
} from 'react-icons/fa';

export const services = [
  {
    id: 'baby-care',
    title: 'Baby Care',
    description: 'Professional and caring babysitting services for your little ones',
    icon: FaBaby,
    color: 'bg-purple-500',
    charge: 500,
  },
  {
    id: 'elderly-care',
    title: 'Elderly Care',
    description: 'Compassionate care services for elderly family members',
    icon: FaUserFriends,
    color: 'bg-pink-500',
    charge: 600,
  },
  {
    id: 'sick-care',
    title: 'Sick People Care',
    description: 'Specialized care for sick or recovering family members',
    icon: FaHeartbeat,
    color: 'bg-red-500',
    charge: 700,
  },
  {
    id: 'pet-care',
    title: 'Pet Care',
    description: 'Professional pet sitting and care services for your furry friends',
    icon: FaPaw,
    color: 'bg-orange-500',
    charge: 400,
  },
  {
    id: 'house-cleaning',
    title: 'House Cleaning',
    description: 'Thorough cleaning services to keep your home spotless',
    icon: FaBroom,
    color: 'bg-blue-500',
    charge: 450,
  },
  {
    id: 'cooking-service',
    title: 'Cooking Service',
    description: 'Professional chefs to prepare delicious meals at your home',
    icon: FaUtensils,
    color: 'bg-yellow-500',
    charge: 550,
  },
  {
    id: 'laundry-service',
    title: 'Laundry Service',
    description: 'Complete laundry and ironing services for your convenience',
    icon: FaTshirt,
    color: 'bg-indigo-500',
    charge: 350,
  },
  {
    id: 'gardening-service',
    title: 'Gardening Service',
    description: 'Expert gardeners for lawn care and plant maintenance',
    icon: FaSeedling,
    color: 'bg-green-500',
    charge: 500,
  },
  {
    id: 'tutoring-service',
    title: 'Tutoring Service',
    description: 'Qualified tutors for academic support and learning assistance',
    icon: FaGraduationCap,
    color: 'bg-teal-500',
    charge: 600,
  },
  {
    id: 'physiotherapy',
    title: 'Physiotherapy',
    description: 'Licensed physiotherapists for rehabilitation and pain management',
    icon: FaHandHoldingHeart,
    color: 'bg-cyan-500',
    charge: 800,
  },
  {
    id: 'nursing-care',
    title: 'Nursing Care',
    description: 'Registered nurses for medical care and health monitoring',
    icon: FaUserNurse,
    color: 'bg-rose-500',
    charge: 900,
  },
  {
    id: 'post-surgery-care',
    title: 'Post-Surgery Care',
    description: 'Specialized care for post-operative recovery and wound management',
    icon: FaBandAid,
    color: 'bg-violet-500',
    charge: 1000,
  },
  {
    id: 'mental-health-support',
    title: 'Mental Health Support',
    description: 'Professional mental health support and counseling services',
    icon: FaBrain,
    color: 'bg-purple-600',
    charge: 850,
  },
  {
    id: 'child-development-care',
    title: 'Child Development Care',
    description: 'Specialized care focusing on child development and learning',
    icon: FaChild,
    color: 'bg-pink-400',
    charge: 650,
  },
  {
    id: 'special-needs-care',
    title: 'Special Needs Care',
    description: 'Dedicated care for individuals with special needs and disabilities',
    icon: FaWheelchair,
    color: 'bg-blue-600',
    charge: 750,
  },
  {
    id: 'home-maintenance',
    title: 'Home Maintenance',
    description: 'Skilled technicians for repairs and home maintenance tasks',
    icon: FaTools,
    color: 'bg-gray-600',
    charge: 600,
  },
  {
    id: 'grocery-shopping',
    title: 'Grocery Shopping',
    description: 'Personal shopping service to get your groceries delivered',
    icon: FaShoppingCart,
    color: 'bg-green-600',
    charge: 300,
  },
  {
    id: 'medication-management',
    title: 'Medication Management',
    description: 'Professional assistance with medication schedules and administration',
    icon: FaPills,
    color: 'bg-red-600',
    charge: 500,
  },
  {
    id: 'transportation-service',
    title: 'Transportation Service',
    description: 'Safe and reliable transportation for medical appointments and errands',
    icon: FaCar,
    color: 'bg-slate-600',
    charge: 400,
  },
  {
    id: 'companionship-service',
    title: 'Companionship Service',
    description: 'Friendly companions for social interaction and emotional support',
    icon: FaUsers,
    color: 'bg-amber-500',
    charge: 450,
  },
  {
    id: 'respite-care',
    title: 'Respite Care',
    description: 'Temporary care relief for primary caregivers',
    icon: FaBed,
    color: 'bg-lime-500',
    charge: 700,
  },
  {
    id: 'palliative-care',
    title: 'Palliative Care',
    description: 'Compassionate end-of-life care and comfort support',
    icon: FaHeart,
    color: 'bg-rose-600',
    charge: 1100,
  },
  {
    id: 'emergency-care',
    title: 'Emergency Care',
    description: '24/7 emergency care services for urgent medical situations',
    icon: FaAmbulance,
    color: 'bg-red-700',
    charge: 1200,
  },
];

export const serviceCharges = services.reduce((acc, service) => {
  acc[service.id] = service.charge;
  return acc;
}, {});

export const serviceNames = services.reduce((acc, service) => {
  acc[service.id] = service.title;
  return acc;
}, {});

export const serviceDetails = services.reduce((acc, service) => {
  acc[service.id] = {
    id: service.id,
    title: `${service.title} Service`,
    description: `${service.description}. Our trained professionals provide reliable and compassionate care tailored to your needs.`,
    icon: service.icon,
    color: service.color,
    features: [
      'Professional and certified caregivers',
      'Flexible scheduling options',
      'Personalized care plans',
      'Regular updates and communication',
      'Affordable and transparent pricing',
    ],
    charge: service.charge,
  };
  return acc;
}, {});

// Enhanced features for specific services
serviceDetails['baby-care'].features = [
  'Experienced and certified babysitters',
  'Age-appropriate activities and care',
  'Meal preparation and feeding assistance',
  'Safe and secure environment',
  'Flexible scheduling options',
];

serviceDetails['elderly-care'].features = [
  'Trained elderly care specialists',
  'Medication management',
  'Assistance with daily activities',
  'Companionship and emotional support',
  'Health monitoring',
];

serviceDetails['sick-care'].features = [
  'Medical care assistance',
  'Medication administration',
  'Post-surgery care',
  'Health monitoring and reporting',
  'Comfort and emotional support',
];

serviceDetails['pet-care'].features = [
  'Experienced pet sitters',
  'Feeding and exercise routines',
  'Basic grooming services',
  'Medication administration for pets',
  'Regular updates and photos',
];

serviceDetails['house-cleaning'].features = [
  'Deep cleaning services',
  'Regular maintenance cleaning',
  'Eco-friendly cleaning products',
  'Organized and systematic approach',
  'Satisfaction guaranteed',
];

serviceDetails['cooking-service'].features = [
  'Professional chefs',
  'Customized meal plans',
  'Dietary restrictions accommodated',
  'Fresh ingredients',
  'Meal prep and storage',
];

serviceDetails['nursing-care'].features = [
  'Registered nurses',
  'Vital signs monitoring',
  'Wound care and dressing',
  'Medication administration',
  'Health assessment and reporting',
];

serviceDetails['physiotherapy'].features = [
  'Licensed physiotherapists',
  'Personalized exercise programs',
  'Pain management techniques',
  'Mobility improvement',
  'Progress tracking',
];

serviceDetails['tutoring-service'].features = [
  'Qualified educators',
  'All subjects covered',
  'Exam preparation support',
  'Personalized learning plans',
  'Progress reports',
];

serviceDetails['emergency-care'].features = [
  '24/7 availability',
  'Rapid response team',
  'Medical emergency handling',
  'Coordination with hospitals',
  'Family notification',
];

