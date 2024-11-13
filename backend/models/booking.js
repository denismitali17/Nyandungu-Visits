import pool, { dbConnect } from "../config/database.js";
import { sendEmail } from "../services/emailService.js";

export const BookingModel = {
  async create(bookingData) {
    const { userId, date, timeSlot, groupSize, email, phone } = bookingData;

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
};
