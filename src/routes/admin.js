import express from 'express';
import { authenticateUser, isAdmin } from '../middleware/auth.js';

export const router = express.Router();

router.use(authenticateUser, isAdmin);

router.get('/bookings', async (req, res) => {
  // Implement admin booking list
  res.json({ message: 'Admin bookings route' });
});

router.get('/newsletter-subscribers', async (req, res) => {
  // Implement newsletter subscribers list
  res.json({ message: 'Admin newsletter subscribers route' });
});