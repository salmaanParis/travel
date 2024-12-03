import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('https://backend-toptal.onrender.com/api/contact');
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Error fetching messages');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Message</th>
              <th className="py-2 px-4 border-b">Date</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
