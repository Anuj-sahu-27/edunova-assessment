const mongoose = require('mongoose');

// Define Transaction schema
const transactionSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issueDate: { type: Date, required: true },
    returnDate: { type: Date },
    rentGenerated: { type: Number, default: 0 },
    status: { type: String, enum: ['issued', 'returned'], default: 'issued' },
    createdAt: { type: Date, default: Date.now },
});

// Export Transaction model
module.exports = mongoose.model('Transaction', transactionSchema);
