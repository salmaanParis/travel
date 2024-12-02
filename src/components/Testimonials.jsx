import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react'; // Import the User icon

const Testimonials = () => {
  const testimonials = [
    { 
      name: 'Arun Nair', 
      feedback: 'Amazing experience! Will definitely book again.', 
      rating: 5,
      location: 'Kochi, Kerala'
    },
    { 
      name: 'Anu Pillai', 
      feedback: 'A wonderful trip, everything was well-organized.', 
      rating: 5,
      location: 'Thiruvananthapuram, Kerala'
    },
    { 
      name: 'Ravi Menon', 
      feedback: 'Highly recommend TOPTAL for your travel needs!', 
      rating: 5,
      location: 'Kozhikode, Kerala'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 text-blue-900">What Our Clients Say</h2>
        <p className="text-xl text-center mb-12 text-blue-700">Hear from our satisfied travelers</p>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testimonials.map((test, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                <User className="w-16 h-16 text-blue-500 mr-4" /> {/* User icon */}
                <div>
                  <h3 className="font-semibold text-lg text-blue-900">{test.name}</h3>
                  <p className="text-blue-600">{test.location}</p>
                </div>
              </div>
              <div className="mb-4">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} className="inline-block w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-blue-300 mb-2" />
              <p className="text-gray-700 italic mb-4">{test.feedback}</p>
              <div className="text-right">
                <Quote className="w-8 h-8 text-blue-300 inline-block transform rotate-180" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;


