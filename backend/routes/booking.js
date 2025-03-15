const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/authMiddleware');

// Create a booking
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { car, startDate, endDate } = req.body;
    const booking = new Booking({ user: req.user.userId, car, startDate, endDate });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
});

// Get user bookings
router.get('/', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId }).populate('car');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

module.exports = router;
