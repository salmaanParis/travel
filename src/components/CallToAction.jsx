import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Input = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={props.id}>
      {label}
    </label>
    <input
      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
      {...props}
    />
  </div>
);

const TextArea = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={props.id}>
      {label}
    </label>
    <textarea
      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
      {...props}
    />
  </div>
);

const Button = ({ children, ...props }) => (
  <button
    className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
    {...props}
  >
    {children}
  </button>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-toptal.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form after submission
      } else {
        alert('Error sending message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending message. Please try again.');
    }
  };

  return (
    <form id='contact' onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Name"
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Email"
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        label="Phone"
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <TextArea
        label="Message"
        id="message"
        name="message"
        rows={2}
        value={formData.message}
        onChange={handleChange}
        required
      />
      <Button type="submit">
        Send Message
        <Send className="ml-2 h-5 w-5" />
      </Button>
    </form>
  );
};


const ContactInfo = ({ icon: Icon, title, content }) => (
  <div className="flex items-start mb-6">
    <div className="flex-shrink-0 mr-4">
      <div className="bg-blue-100 rounded-full p-3">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-1">{title}</h4>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

const ContactPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-blue-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div {...fadeInUp}>
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-blue-800">Send Us a Message</h3>
              <ContactForm />
            </div>
          </motion.div>
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-blue-800">Contact Information</h3>
              <ContactInfo
                icon={MapPin}
                title="Our Office"
                content="Silpaiswar Building, 2nd Floor, Karamana PO, Thiruvananthapuram, India, Kerala"
              />
              <ContactInfo
                icon={Phone}
                title="Phone"
                content="092070 50052"
              />
              <ContactInfo
                icon={Mail}
                title="Email"
                content="toptaltravelconsultancy@gmail.com"
              />
              <div className="mt-8 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                src="https://www.google.com/maps/embed?pb=!3m2!1sen!2sin!4v1730452871771!5m2!1sen!2sin!6m8!1m7!1sZVsT-cncLMxhNzWBFLxUnw!2m2!1d8.48121098015543!2d76.96477426674596!3f337.0512121231643!4f1.6839026129130872!5f0.7820865974627469" 
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Maps"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
