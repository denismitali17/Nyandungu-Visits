import pool from '../config/database.js';
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
