const express = require('express');
const Contact = require('../models/Contact'); // Ensure this is the correct model

const router = express.Router();

// POST route to handle form submissions
router.post('/', async (req, res) => {
  try {
    const contactData = new Contact(req.body);
    await contactData.save();
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact data:', error);
    res.status(500).json({ message: 'Error saving message.' });
  }
});

// GET route to fetch all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find(); // Fetch all messages
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages.' });
  }
});

// DELETE /api/contact/:id
// DELETE /api/contact/:id
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Contact.findByIdAndDelete(id); // Ensure the model is correct
      if (!result) {
        return res.status(404).json({ message: 'Contact message not found' });
      }
      res.status(200).json({ message: 'Contact message deleted successfully' });
    } catch (error) {
      console.error('Error deleting contact message:', error);
      res.status(500).json({ message: 'Error deleting contact message', error });
    }
  });
  

module.exports = router;


