import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, Star, X } from 'lucide-react';

const DestinationCard = React.memo(({ dest, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.3 }}
    className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="h-60 w-full">
      <img
        srcSet={`${dest.image}?w=600 600w, ${dest.image}?w=1200 1200w`}
        sizes="(max-width: 600px) 600px, 1200px"
        src={dest.image}
        alt={dest.name}
        loading="lazy"
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">{dest.name}</h3>
      {/* <p className="text-gray-600 mb-2">{dest.description}</p> */}
      <p className="text-sm text-gray-800 mb-4">{dest.duration} | {dest.price}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium">{dest.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium">{dest.rating}</span>
        </div>
      </div>
    </div>
    {dest.popular && (
      <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
        Popular
      </span>
    )}
    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button
        onClick={onClick}
        className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-300 flex items-center"
      >
        Explore <ChevronRight className="ml-2 w-4 h-4" />
      </button>
    </div>
  </motion.div>
));

const DestinationPopup = React.memo(({ dest, onClose }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    arrivalDate: '',
    departureDate: '',
    adults: 0,
    kids: 0,
    email: '',
    phoneNumber: '',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      name: formData.name,
      country: formData.country,
      arrivalDate: formData.arrivalDate,
      departureDate: formData.departureDate,
      adults: parseInt(formData.adults, 10),
      kids: parseInt(formData.kids, 10),
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      destinationName: dest.name,
    };

    try {
      const response = await fetch('https://backend-toptal.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const data = await response.json();
      console.log('Booking created successfully:', data);
      setBookingSuccess(true);
      // Reset form data
      setFormData({
        name: '',
        country: '',
        arrivalDate: '',
        departureDate: '',
        adults: 0,
        kids: 0,
        email: '',
        phoneNumber: '',
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('There was an error submitting your booking. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <section id="featureDestination" className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="relative h-64">
          <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" loading="lazy" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-300"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          <h2 className="text-3xl font-bold mb-2">{dest.name}</h2>
          <p className="text-gray-600 mb-4">{dest.description}</p>
          <p className="text-gray-800 mb-4">{dest.duration} | {dest.price}</p>
          <div className="flex items-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-lg font-semibold">{dest.rating}</span>
          </div>

          {bookingSuccess ? (
            <div className="text-center p-4">
              <h3 className="text-xl font-semibold text-green-600">Booking Successful!</h3>
              <p className="mt-2 text-gray-700">Your booking has been confirmed. Thank you!</p>
              <button
                onClick={() => {
                  setBookingSuccess(false);
                  onClose();
                }}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Close
              </button>
            </div>
          ) : isBooking ? (
            <form className="space-y-4" onSubmit={handleBookingSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-600">Destination:</label>
                <input
                  type="text"
                  name="destination"
                  value={dest.name}
                  readOnly
                  className="w-full mt-1 p-2 border rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">Country of Residence:</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Arrival Date:</label>
                  <input
                    type="date"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Departure Date:</label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Adults:</label>
                  <select
                    name="adults"
                    value={formData.adults}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
                    required
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Kids:</label>
                  <select
                    name="kids"
                    value={formData.kids}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">Phone Number:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-colors duration-300 w-full"
              >
                Confirm Booking
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsBooking(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-colors duration-300 flex items-center"
            >
              Book Now <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          )}
        </div>
      </section>
    </motion.div>
  );
});

export default function FeaturedDestinations() {
  const [selectedDest, setSelectedDest] = useState(null);
  const [filter, setFilter] = useState('All');
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('https://backend-toptal.onrender.com/api/destinations');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setDestinations(data.destinations || []);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };
  
    fetchDestinations();
  }, []);

  const filteredDestinations = useMemo(() => (
    Array.isArray(destinations)
      ? filter === 'All'
        ? destinations
        : destinations.filter(dest => dest.type === filter)
      : []
  ), [filter, destinations]);

  return (
    <section id='featureDestination' className="py-20 bg-gradient-to-b from-blue-100 to-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Destinations</h2>
          <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Discover our handpicked selection of breathtaking destinations. Your next adventure awaits!
          </p>
        </div>
        <div className="flex justify-center mt-8 mb-12">
          <div className="inline-flex bg-white rounded-full shadow-md p-1">
            {['All', 'City', 'Beach', 'Mountain'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${filter === type ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {filteredDestinations.map((dest, index) => (
              <DestinationCard key={index} dest={dest} onClick={() => setSelectedDest(dest)} />
            ))}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {selectedDest && (
            <DestinationPopup dest={selectedDest} onClose={() => setSelectedDest(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
