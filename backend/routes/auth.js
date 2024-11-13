import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticateUser } from '../middleware/auth.js';

export const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Add your authentication logic here
  // This is a basic example - implement proper authentication!
  
  const token = jwt.sign(
    { userId: 'user_id', email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({ token });
});