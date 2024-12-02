import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon

const WhatsAppChat = () => (
  <a
      href="https://api.whatsapp.com/send?phone=919207050052"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-green-500 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
    {/* WhatsApp Icon */}
    <FaWhatsapp className="w-8 h-8" /> {/* Adjust the size */}
  </a>
);

export default WhatsAppChat;
