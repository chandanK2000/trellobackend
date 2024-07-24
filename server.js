const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
require('./db/connection');

// Import routes
const accountRoutes = require('./routes/AccountRoutes');
const taskRoutes = require('./routes/TaskRoutes');

// Use routes
app.use('/api/accounts', accountRoutes);
app.use('/api/tasks', taskRoutes); // Add the task routes

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
