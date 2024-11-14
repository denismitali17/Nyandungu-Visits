// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3000;

// Route for homepage
app.use(express.static(path.join(__dirname, 'public')));

// Use bodyParser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to SQLite database
const db = new sqlite3.Database('./nyandungu.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create bookings table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        visitDate TEXT NOT NULL,
        ticketType TEXT NOT NULL,
        timeSlot TEXT NOT NULL
      )
    `);
  }
});

// Route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Import booking routes
const bookingRoutes = require('./booking');
app.use('/booking', bookingRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
