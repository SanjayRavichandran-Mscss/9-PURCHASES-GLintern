const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const db = require('./config/db');
const dotenv = require('dotenv').config();
const { logger, notFoundHandler } = require('./middleware/middleware');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Register routes
app.use('/api', apiRoutes);

// Handle 404 errors
app.use(notFoundHandler);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: err.message });
});

// Start the Server
db.query("SELECT 1")
    .then(() => {
        console.log("MySQL connected!");
        app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
    })
    .catch((err) => console.error("Database connection failed:", err.message));
