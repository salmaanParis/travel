const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');
require('dotenv').config();

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Check if an admin already exists
    const existingAdmin = await Admin.findOne({ email: 'toptaltravelconsultancy@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Hash the new passwordljjgt
    const hashedPassword = await bcrypt.hash('Saleem3@', 10);

    // Create a new admin user
    await Admin.create({ email: 'toptaltravelconsultancy@gmail.com', password: hashedPassword });
    console.log('Admin user created with updated email and password');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();
