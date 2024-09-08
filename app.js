const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/route'); // Importing the routes
require('dotenv').config(); // To load environment variables from a `.env` file

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB using Mongoose 
mongoose.connect(process.env.MONGODB_URI,{
    dbName:"library"
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log('Error connecting to MongoDB:', error));

// Routes
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Default route for health check or root
app.get('/', (req, res) => {
    res.send('API is working!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
