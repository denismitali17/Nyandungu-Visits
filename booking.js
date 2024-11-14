// booking.js
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('./nyandungu.db');

// Route to handle booking form submission
router.post('/submit', (req, res) => {
  const { name, email, visitDate, ticketType, timeSlot } = req.body;

  // Insert booking data into the database
  const query = `INSERT INTO bookings (name, email, visitDate, ticketType, timeSlot) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [name, email, visitDate, ticketType, timeSlot], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error saving booking.");
    } else {
      res.send("Booking successful!");
    }
  });
});

module.exports = router;
