const express = require('express');
const path = require('path');
const Destination = require('../models/Destination');
const getDestination = require('../middleware/getDestination');

const router = express.Router();

// Get all destinations (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const destinations = await Destination.find().skip(skip).limit(limit);
    const total = await Destination.countDocuments();

    res.json({
      destinations,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalDestinations: total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single destination
router.get('/:id', getDestination, (req, res) => {
  res.json(res.destination);
});

// Create a new destination
router.post('/', async (req, res) => {
  const destination = new Destination(req.body);
  

  
    destination.image = req.body.image; // Directly assign the image URLs
  
    console.log(destination)

  try {
    const newDestination = await destination.save();
    res.status(201).json(newDestination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a destination
router.put('/:id', getDestination, async (req, res) => {
  Object.assign(res.destination, req.body);

  // Handle new image URLs if provided
  if (Array.isArray(req.body.images)) {
    res.destination.images = [
      ...(res.destination.images || []),
      ...req.body.images // Directly append the new image URLs
    ];
  }

  try {
    const updatedDestination = await res.destination.save();
    res.json(updatedDestination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a destination
router.delete('/:id', async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.status(200).json({ message: 'Destination deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;



