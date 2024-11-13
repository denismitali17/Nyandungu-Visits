import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.NODE_ENV === 'production'
});

export const dbConnect = async () => {
  try {
    await pool.connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

export default pool;

// src/models/newsletter.js
import pool from './database.js';
import { sendEmail } from '../services/emailService.js';

export const NewsletterModel = {
  async subscribe(userData) {
    const { name, email, interests } = userData;
    
    const query = `
      INSERT INTO newsletter_subscribers (name, email, interests)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    const result = await pool.query(query, [name, email, interests]);
    await sendEmail({
      to: email,
      subject: 'Welcome to Eco-Park Newsletter!',
      template: 'newsletter-welcome',
      context: { name }
    });
    
    return result.rows[0];
  },
  
  async unsubscribe(email) {
    const query = `
      UPDATE newsletter_subscribers
      SET active = false
      WHERE email = $1
      RETURNING *
    `;
    
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }
};
