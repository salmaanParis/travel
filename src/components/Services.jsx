import React from 'react';
import { motion } from 'framer-motion';
import { Plane, StampIcon, GraduationCap } from 'lucide-react';
import { FaPassport } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      title: 'Ticket Booking',
      description: `AIR TICKET\nBUS TICKET\nRAILWAY TICKET`,
      icon: Plane,
      color: 'bg-blue-100 text-blue-600', // Custom colors
    },
    {
      title: 'Visa Processing',
      description: `GCC COUNTRIES (KUWAIT, SAUDIA, OMAN, QATAR, UAE)\nCUBODE TOURIST VISA`,
      icon: FaPassport,
      color: 'bg-yellow-100 text-yellow-600', // Custom colors
    },
    {
      title: 'Visa Stamping',
      description: `KUWAIT\nSAUDIA\nETC`,
      icon: StampIcon,
      color: 'bg-green-100 text-green-600', // Custom colors
    },
    {
      title: 'Admissions',
      description: `MBBS, ENGINEERING, NURSING, PARAMEDICAL COURSES\nMBA, BBA, OTHER PG COURSES\nCERTIFICATE ATTESTATION`,
      icon: GraduationCap,
      color: 'bg-red-100 text-red-600', // Custom colors
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
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
          Our Premium Services
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between h-full"
              variants={itemVariants}
            >
              <div>
                <div
                  className={`flex items-center justify-center w-16 h-16 mb-4 rounded-full ${service.color || 'bg-gray-100 text-gray-600'}`}
                >
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-800">{service.title}</h3>
                <p className="text-gray-600 font-bold whitespace-pre-line mb-4">{service.description}</p>
              </div>
              <motion.button
                className="text-indigo-600 font-semibold flex items-center mt-2"
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

export default Services;



