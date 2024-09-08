const mongoose = require('mongoose');

// Define Book schema
const bookSchema = new mongoose.Schema({
    name: { type: String, required: true},
    category: { type: String, required: true },
    rentPerDay: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Export Book model
module.exports = mongoose.model('Book', bookSchema);
