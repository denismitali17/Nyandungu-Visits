import express from 'express';
import { NewsletterModel } from '../models/newsletter.js';

export const router = express.Router();

router.post('/subscribe', async (req, res) => {
  try {
    const result = await NewsletterModel.subscribe(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/unsubscribe', async (req, res) => {
  try {
    const result = await NewsletterModel.unsubscribe(req.body.email);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});