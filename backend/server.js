const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));



  const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);


// Routes
const destinationRoutes = require('./routes/destinations');
app.use('/api/destinations', destinationRoutes);

const contactRoutes = require('./routes/contact'); // Import the contact routes
app.use('/api/contact', contactRoutes); // Use the contact routes

const bookingsRoutes = require('./routes/bookings');
app.use('/api/bookings', bookingsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: 'Something went wrong!', error: err.message });
});

// Check for required environment variables
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI environment variable is not set.');
  process.exit(1); // Exit the process with failure
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
