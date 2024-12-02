import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function EditDestinationModal({ destination, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    rating: 0,
    popular: false,
    type: '',
    price: '',
    duration: ''
  });

  useEffect(() => {
    if (destination) {
      setFormData(destination);
    }
  }, [destination]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        destination ? `http://localhost:5000/api/destinations/${destination._id}` : 'http://localhost:5000/api/destinations',
        {
          method: destination ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );
      const data = await response.json();
      onSave(data);
    } catch (error) {
      console.error('Error saving destination:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{destination ? 'Edit' : 'Add'} Destination</h2>
        <form onSubmit={handleSubmit} className="">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              id="name"
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Name" 
              required 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input 
              id="image"
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              placeholder="Image URL" 
              required 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              id="description"
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Description" 
              required 
              rows={3}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          {/* <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
            <input 
              id="rating"
              name="rating" 
              value={formData.rating} 
              onChange={handleChange} 
              type="number" 
              placeholder="Rating" 
              min="0" 
              max="5" 
              step="0.1"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div> */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <input 
              id="type"
              name="type" 
              value={formData.type} 
              onChange={handleChange} 
              placeholder="Type (e.g., City, Beach)" 
              required 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input 
              id="price"
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              placeholder="Price" 
              required 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
            <input 
              id="duration"
              name="duration" 
              value={formData.duration} 
              onChange={handleChange} 
              placeholder="Duration" 
              required 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center">
            <input 
              id="popular"
              type="checkbox" 
              name="popular" 
              checked={formData.popular} 
              onChange={handleChange} 
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="popular" className="ml-2 block text-sm text-gray-900">Popular</label>
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {destination ? 'Update' : 'Add'} Destination
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('destinations');
  const [destinations, setDestinations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedDest, setSelectedDest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destResponse, msgResponse, bookingResponse] = await Promise.all([
          fetch('http://localhost:5000/api/destinations'),
          fetch('http://localhost:5000/api/contact'),
          fetch('http://localhost:5000/api/bookings')
        ]);
        const destData = await destResponse.json();
        const msgData = await msgResponse.json();
        const bookingData = await bookingResponse.json();
        setDestinations(destData.destinations);
        setMessages(msgData);
        setBookings(bookingData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const deleteDestination = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/destinations/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting destination');
      }
      setDestinations(destinations.filter((dest) => dest._id !== id));
    } catch (error) {
      console.error('Error deleting destination:', error);
    }
  };

  const deleteBooking = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting booking');
      }
      setBookings(bookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting message');
      }
      setMessages(messages.filter((message) => message._id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const openEditModal = (destination = null) => {
    setSelectedDest(destination);
    setIsModalOpen(true);
  };


  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('adminToken'); // Adjust if you're using a different key
    // You might want to clear other auth-related data here as well

    // Redirect to admin login page
    navigate('/admin-login');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          {['destinations', 'bookings', 'messages'].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'destinations' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Destinations</h2>
            <button
              onClick={() => openEditModal()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add New Destination
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {destinations.map((dest) => (
              <div key={dest._id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">{dest.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{dest.description}</p>
                <p className="font-medium">Price: ${dest.price}</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => openEditModal(dest)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteDestination(dest._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Phone Number</th>
                  <th className="py-2 px-4 border-b text-left">Destination</th>
                  <th className="py-2 px-4 border-b text-left">Arrival Date</th>
                  <th className="py-2 px-4 border-b text-left">Departure Date</th>
                  <th className="py-2 px-4 border-b text-left">Adults</th>
                  <th className="py-2 px-4 border-b text-left">Kids</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking._id} className={index === 1 ? "bg-green-100" : ""}>
                    <td className="py-2 px-4 border-b">{booking.name}</td>
                    <td className="py-2 px-4 border-b">{booking.email}</td>
                    <td className="py-2 px-4 border-b">{booking.phoneNumber}</td>
                    <td className="py-2 px-4 border-b">{booking.destinationName}</td>
                    <td className="py-2 px-4 border-b">{new Date(booking.arrivalDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{new Date(booking.departureDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{booking.adults}</td>
                    <td className="py-2 px-4 border-b">{booking.kids}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => deleteBooking(booking._id)}
                        
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Phone</th>
                  <th className="py-2 px-4 border-b text-left">Message</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message._id}>
                    <td className="py-2 px-4 border-b">{message.name}</td>
                    <td className="py-2 px-4 border-b">{message.email}</td>
                    <td className="py-2 px-4 border-b">{message.phone}</td>
                    <td className="py-2 px-4 border-b">{message.message}</td>
                    <td className="py-2 px-4 border-b">{new Date(message.createdAt).toLocaleString()}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => deleteMessage(message._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <EditDestinationModal
          destination={selectedDest}
          onClose={() => setIsModalOpen(false)}
          onSave={(updatedDestination) => {
            if (selectedDest) {
              setDestinations(
                destinations.map((dest) => (dest._id === updatedDestination._id ? updatedDestination : dest))
              );
            } else {
              setDestinations([...destinations, updatedDestination]);
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}


