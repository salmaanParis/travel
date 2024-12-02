import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Shield, FileText, User } from 'lucide-react';

const ExtraServices = () => {
  const extraServices = [
    { 
      title: 'Job Visa', 
      description: 'Comprehensive assistance with job visas for ANM, GNM, and Staff Nurses, including placements in care homes for both male and female nurses', 
      icon: User,
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      title: 'Visiting Visa Assistance', 
      description: 'Support for securing visiting visas for healthcare professionals', 
      icon: Plane,
      color: 'bg-green-100 text-green-600'
    },
    { 
      title: 'Special Packages & Deals', 
      description: 'Exclusive deals for nursing professionals, offering affordable travel and accommodation options', 
      icon: Shield,
      color: 'bg-purple-100 text-purple-600'
    },
    { 
      title: 'Trip Planning & Flight Booking', 
      description: 'Personalized trip planning services, including flight and accommodation booking to ensure a hassle-free experience', 
      icon: FileText,
      color: 'bg-orange-100 text-orange-600'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-indigo-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Enhance Your Journey
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {extraServices.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
              variants={itemVariants}
            >
              <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mb-6`}>
                <service.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mb-4"><strong>{service.description}</strong></p> {/* Bold description */}
              <motion.button
                className="text-indigo-600 font-semibold flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Learn More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExtraServices;

