const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  popular: { type: Boolean, default: false },
  type: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
});

module.exports = mongoose.model('Destination', destinationSchema);