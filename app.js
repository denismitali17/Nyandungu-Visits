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

app.post('/signup', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.render('signup', { 
            activePage: 'signup', 
            pageTitle: 'Sign Up', 
            error: 'All fields are required.', 
            success: null 
        });
    }

    // Insert into database and handle duplicate email checks
    db.run(
        `INSERT INTO users (name, email) VALUES (?, ?)`, 
        [name, email], 
        (err) => {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.render('signup', { 
                        activePage: 'signup', 
                        pageTitle: 'Sign Up', 
                        error: 'Email is already registered.', 
                        success: null 
                    });
                }
                return res.render('signup', { 
                    activePage: 'signup', 
                    pageTitle: 'Sign Up', 
                    error: 'An error occurred. Please try again.', 
                    success: null 
                });
            }

            res.render('signup', { 
                activePage: 'signup', 
                pageTitle: 'Sign Up', 
                error: null, 
                success: 'Registration successful!' 
            });
        }
    );
});


// Admin logout route
app.get('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

app.get('/admin/dashboard', (req, res) => {
    if (!req.isAuthenticated) {
        return res.redirect('/admin/login');
    }

    // Fetch both bookings and users from the database
    db.all("SELECT * FROM bookings", (err, bookings) => {
        if (err) {
            console.error('Error fetching bookings:', err.message);
            return res.status(500).send("Error fetching bookings");
        }

        db.all("SELECT * FROM users", (err, users) => {
            if (err) {
                console.error('Error fetching users:', err.message);
                return res.status(500).send("Error fetching users");
            }

            // Render the dashboard with both bookings and users
            res.render('admin/dashboard', { 
                bookings: bookings, 
                users: users, 
                pageTitle: 'Admin Dashboard', 
                activePage: 'admin-dashboard' 
            });
        });
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
    res.render('signup', { 
        activePage: 'signup', 
        pageTitle: 'Sign Up', 
        error: null, 
        success: null 
    });
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
// Connect to SQLite database
const db = new sqlite3.Database('./nyandungu.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Create the bookings table
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

        // Create the users table
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE
            )
        `, (err) => {
            if (err) {
                console.error('Error creating users table:', err.message);
            } else {
                console.log('Users table created or already exists.');
            }
        });
    }
});


// Import booking routes
const bookingRoutes = require('./booking');
app.use('/booking', bookingRoutes);

// Start server
const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

