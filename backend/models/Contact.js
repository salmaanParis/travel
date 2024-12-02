// models/Contact.js
const mongoose = require('mongoose');

// Define the schema for the contact messages
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  message: { type: String, required: true },
}, { timestamps: true }); // Optional: Adds createdAt and updatedAt timestamps

// Create and export the model
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
