const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  adults: { type: Number, required: true, min: 0 },
  kids: { type: Number, required: true, min: 0 },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: /^\+?[1-9]\d{1,14}$/, // E.164 phone number format
  },
  destinationName: { type: String, required: true, trim: true }, // Use destinationName instead of destinationId
});

// Validate that arrivalDate is before departureDate
bookingSchema.pre('save', function (next) {
  if (this.arrivalDate >= this.departureDate) {
    const err = new Error('Arrival date must be before departure date.');
    next(err);
  } else {
    next();
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking; // Correct the export to match the defined model


