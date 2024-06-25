require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sysRouter = require('./routes/sysRouter');
const gameRouter = require('./routes/generalRouter');
const { logout } = require('./controllers/main/authController');
const app = express();
const port = process.env.PORT || 3000;
const adminOrigin = `${process.env.DOMAIN}:${process.env.ADMIN_DOMAIN_PORT}`;
const mainOrigin = `${process.env.DOMAIN}:${process.env.MAIN_DOMAIN_PORT}`;

// Debugging: Log environment variables
console.log('Server environment variables:', {
    PORT: port,
    DOMAIN: process.env.DOMAIN,
    ADMIN_DOMAIN_PORT: process.env.ADMIN_DOMAIN_PORT,
    MAIN_DOMAIN_PORT: process.env.MAIN_DOMAIN_PORT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    COOKIE_AGE: process.env.COOKIE_AGE,
    NODE_ENV: process.env.NODE_ENV
});

// Middleware: Log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Middleware: Cookie Handling
app.use(cookieParser());

// Middleware: Session Handling
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: parseInt(process.env.COOKIE_AGE, 10),
        secure: process.env.NODE_ENV === 'production' // Only true for HTTPS
    },
    saveUninitialized: false, // To not save uninitialized sessions
    resave: false, // To not save on every API call
    unset: 'destroy' // Destroy all cookies when the client ends the session
}));

// Middleware: CORS Configuration
app.use(cors({
    origin: [adminOrigin, mainOrigin], // Allow requests from these origin
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allow these HTTP methods
    credentials: true, // Allow cookies
    allowedHeaders: ['Content-Type', 'Authorization', 'set-cookie'], // Allow these headers
}));

// Middleware: Parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route for testing
app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

// System Admin Routes
app.use('/api/system', sysRouter);
// Game Routes
app.use('/api', gameRouter);
// Logout route
app.post('/api/logout', logout)

// Debugging: Catch unhandled routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
