require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const database = require('./config/dbConfig.js');
const sysRouter = require('./routes/sysRouter.js');
const cors = require('cors');

const app = express();
const port = process.env.PORT;
const sysRoute = process.env.SYSTEM_URL;
const origin = process.env.DOMAIN + ":" + process.env.DOMAIN_PORT
// app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use(cors({
    origin: origin, // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register routes
app.use('/api/system', sysRouter);

app.listen(port, () => {
    database.connect();
    console.log(`Server listening on port ${port}`);
});
