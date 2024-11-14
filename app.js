// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use bodyParser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index', { activePage: 'home', pageTitle: 'Home' });
});

app.get('/booking', (req, res) => {
    res.render('booking', { activePage: 'booking', pageTitle: 'Booking' });
});

app.get('/signup', (req, res) => {
    res.render('signup', { activePage: 'signup', pageTitle: 'Sign Up' });
});

app.get('/service', (req, res) => {
    res.render('service', { activePage: 'service', pageTitle: 'Services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { activePage: 'contact', pageTitle: 'Contact' });
});

app.get('/package', (req, res) => {
    res.render('package', { activePage: 'package', pageTitle: 'Events' });
});

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

// Import booking routes
const bookingRoutes = require('./booking');
app.use('/booking', bookingRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
