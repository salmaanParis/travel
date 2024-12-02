const Destination = require('../models/Destination');

async function getDestination(req, res, next) {
  let destination;
  try {
    destination = await Destination.findById(req.params.id);
    if (destination == null) {
      return res.status(404).json({ message: 'Destination not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.destination = destination;
  next();
}

module.exports = getDestination;