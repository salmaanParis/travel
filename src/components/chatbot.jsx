'use client'

import React, { useState, useRef, useEffect } from 'react';

export default function TravelChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your travel assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);

      const botResponse = getBotResponse(input);
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
      }, 500);

      setInput('');
    }
  };

  const handlePlaceholderClick = (option) => {
    let botResponse = '';
    switch (option) {
      case 'Flight Details':
        botResponse = 'We offer flights to various destinations. Please provide your departure city, destination, and travel dates for booking.';
        break;
      case 'Popular Packages':
        botResponse = 'Our popular travel packages include Bali Getaway, Paris Romantic Tour, and New York City Exploration. Would you like more details?';
        break;
      case 'Contact Support':
        botResponse = 'You can reach our support team at 092070 50052 or email us at toptaltravelconsultancy@gmail.com.';
        break;
      case 'Hotel Recommendations':
        botResponse = 'We have great hotel recommendations based on your budget and destination. Please provide details to get started!';
        break;
      default:
        botResponse = "I'm here to assist you with your travel needs!";
    }

    setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I assist you with your travel plans?";
    } else if (lowerMessage.includes('book') && lowerMessage.includes('flight')) {
      return "To book a flight, please provide your departure city, destination, and travel dates.";
    } else if (lowerMessage.includes('hotel') && lowerMessage.includes('recommend')) {
      return "I'd be glad to recommend hotels! Could you please tell me your destination and budget range?";
    } else {
      return "I'm here to help with flights, hotels, and travel insurance. How can I assist you?";
    }
  };

  return (
    <>
      {/* Chat Icon Button (Image without Border) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-4 p-0 bg-transparent hover:scale-110 transform transition-all duration-200 ease-in-out"
        >
          <img src="/chat.png" alt="Chatbot Icon" className="h-14 w-14" />
        </button>
      )}

      {/* Chatbot Popup (Advanced UI) */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 w-72 bg-white border border-gray-300 rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
            <h2 className="text-md font-semibold">Travel Assistant</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 transition duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Placeholder Buttons */}
          <div className="p-3 bg-gray-50">
            <div className="grid grid-cols-2 gap-2">
              {['Flight Details', 'Popular Packages', 'Contact Support', 'Hotel Recommendations'].map((option) => (
                <button
                  key={option}
                  onClick={() => handlePlaceholderClick(option)}
                  className="bg-gradient-to-r from-blue-400 to-teal-400 text-white py-1 px-2 rounded-md text-sm font-medium hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 focus:outline-none transition-all duration-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Container */}
          <div className="h-52 overflow-y-auto p-3 bg-gray-50">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Container */}
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex space-x-2"
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 transition-all duration-200 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}




