import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const socialIcons = [
  { Icon: Facebook, href: '#' },
  { Icon: Twitter, href: '#' },
  { Icon: Instagram, href: '#' },
  { Icon: Linkedin, href: '#' },
];

const quickLinks = ['Home', 'Destinations', 'Packages', 'Services', 'Contact'];

const Footer = () => {
  const navigate = useNavigate(); // Use useNavigate hook
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/world-map.png')] opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gold">About TOPTAL</h3>
            <p className="text-gray-300 mb-6">Luxury travel experiences tailored to your dreams. Explore the world with unparalleled comfort and style.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gold text-black font-semibold py-2 px-4 rounded-full bg-white transition duration-300"
              onClick={() => navigate("/admin-login")} // Correct usage of navigate function
            >
            Agent
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-gold transition duration-300 flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-gold flex-shrink-0 mt-1" />
                <p className="text-gray-300">Silpaiswar Building, 2nd Floor, Karamana PO<br />Thiruvananthapuram, India, Kerala</p>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-gold" />
                <p className="text-gray-300">092070 50052</p>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-gold" />
                <a href="mailto:info@taptal.com" className="text-gray-300 hover:text-gold transition duration-300">toptaltravelconsultancy@gmail.com</a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gold">Follow Us</h3>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 p-3 rounded-full text-gold hover:bg-gold hover:text-black transition duration-300"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-gold">Subscribe to Our Newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gold text-black font-semibold px-4 py-2 rounded-r-full bg-white transition duration-300"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-800 text-center"
        >
          <p className="text-gray-400">&copy; {currentYear} Toptal travel consultancy. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;