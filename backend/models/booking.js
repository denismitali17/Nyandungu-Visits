import pool, { dbConnect } from "../config/database.js";
import { sendEmail } from "../services/emailService.js";

export const BookingModel = {
  async create(bookingData) {
    const { userId, date, timeSlot, groupSize, email, phone } = bookingData;
<<<<<<< HEAD:backend/models/booking.js
=======
    
    // Ensure group size is within allowed limits
    if (groupSize > process.env.MAX_GROUP_SIZE) {
      throw new Error(`Group size exceeds the maximum allowed of ${process.env.MAX_GROUP_SIZE}`);
    }
>>>>>>> 42653a1fbaf40ffa4316d8d4d17af3ba08b32781:src/models/booking.js

    const query = `
      INSERT INTO bookings (user_id, date, time_slot, group_size, email, phone)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const result = await pool.query(query, [
      userId,
      date,
      timeSlot,
      groupSize,
      email,
      phone,
    ]);

<<<<<<< HEAD:backend/models/booking.js
=======
    // Send confirmation email to the user
>>>>>>> 42653a1fbaf40ffa4316d8d4d17af3ba08b32781:src/models/booking.js
    await sendEmail({
      to: email,
      subject: "Eco-Park Visit Confirmation",
      template: "booking-confirmation",
      context: {
        bookingId: result.rows[0].id,
        date,
        timeSlot,
        groupSize,
      },
    });

    return result.rows[0];
  },

  async checkAvailability(date, timeSlot) {
    const query = `
      SELECT COALESCE(SUM(group_size), 0) as total_visitors
      FROM bookings
      WHERE date = $1 AND time_slot = $2
    `;

    const result = await pool.query(query, [date, timeSlot]);
    const maxCapacity = process.env.MAX_SLOT_CAPACITY || 50;

    return {
      available: result.rows[0].total_visitors < maxCapacity,
      remainingSpots: maxCapacity - result.rows[0].total_visitors,
    };
  },
<<<<<<< HEAD:backend/models/booking.js
=======

  async cancelBooking(bookingId, email) {
    const query = `
      DELETE FROM bookings
      WHERE id = $1 AND email = $2
      RETURNING *
    `;
    
    const result = await pool.query(query, [bookingId, email]);
    
    if (result.rowCount === 0) {
      throw new Error('No booking found with the provided ID and email.');
    }

    // Send cancellation email to the user
    await sendEmail({
      to: email,
      subject: 'Eco-Park Booking Cancellation',
      template: 'booking-cancellation',
      context: { 
        bookingId,
        date: result.rows[0].date,
        timeSlot: result.rows[0].time_slot,
      }
    });

    return result.rows[0];
  }
>>>>>>> 42653a1fbaf40ffa4316d8d4d17af3ba08b32781:src/models/booking.js
};

