import express from 'express';
import { BookingModel } from '../models/booking.js';
import { authenticateUser } from '../middleware/auth.js';

export const router = express.Router();

router.post('/check-availability', async (req, res) => {
  try {
    const { date, timeSlot } = req.body;
    const availability = await BookingModel.checkAvailability(date, timeSlot);
    res.json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create', authenticateUser, async (req, res) => {
  try {
    const booking = await BookingModel.create(req.body);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});