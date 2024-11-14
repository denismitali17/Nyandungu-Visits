const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// Generate a random secret key for sessions
const secretKey = crypto.randomBytes(32).toString('hex');

// Set up session with randomly generated secret key
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
}));

// Middleware to check authentication status
app.use((req, res, next) => {
    req.isAuthenticated = req.session.isAuthenticated || false;
    next();
});

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use bodyParser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Admin login route
app.get('/admin/login', (req, res) => {
    res.render('admin/login', { error: null, pageTitle: 'Admin Login', activePage: 'admin-login' });
});

app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') { // Simple check for now
        req.session.isAuthenticated = true;
        res.redirect('/admin/dashboard');
    } else {
        res.render('admin/login', { error: 'Invalid credentials', pageTitle: 'Admin Login', activePage: 'admin-login' });
    }
});

// Admin logout route
app.get('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

// Admin dashboard route
app.get('/admin/dashboard', (req, res) => {
    if (!req.isAuthenticated) {
        return res.redirect('/admin/login');
    }

    db.all("SELECT * FROM bookings", (err, rows) => {
        if (err) {
            console.error('Error fetching bookings:', err.message);
            res.status(500).send("Error fetching bookings");
        } else {
            res.render('admin/dashboard', { bookings: rows, pageTitle: 'Admin Dashboard', activePage: 'admin-dashboard' });
        }
    });
});

// Page routes with dynamic titles
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
