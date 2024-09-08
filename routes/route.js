const express = require('express');
const router = express.Router();

// Import Controllers
const userController = require('../controllers/userController');
const bookController = require('../controllers/bookController');
const transactionController = require('../controllers/transactionController');

// User Routes
router.get('/api/users', userController.getAllUsers); // Get all users
router.get('/api/users/:id', userController.getUserById); // Get user by ID
router.post('/api/users', userController.createUser); // Create a new user
router.put('/api/users/:id', userController.updateUser); // Update user by ID
router.delete('/api/users/:id', userController.deleteUser); // Delete user by ID

// Book Routes
router.get('/api/books', bookController.getAllBooks); // Get all books
router.get('/api/books/:id', bookController.getBookById); // Get book by ID
router.post('/api/books', bookController.createBook); // Create a new book
router.put('/api/books/:id', bookController.updateBook); // Update book by ID
router.delete('/api/books/:id', bookController.deleteBook); // Delete book by ID

// Transaction Routes
router.post('/api/transactions/issue', transactionController.issueBook); // Issue a book
router.post('/api/transactions/return', transactionController.returnBook); // Return a book
router.get('/api/transactions/issuers/:bookName', transactionController.getBookIssuers); // Get list of issuers for a book
router.get('/api/transactions/total-rent/:bookName', transactionController.getTotalRentByBook); // Get total rent for a book
router.get('/api/transactions/user-books/:userId', transactionController.getBooksIssuedToUser); // Get books issued to a user
router.get('/api/transactions/date-range', transactionController.getBooksIssuedInDateRange); // Get books issued within a date range

// Export the router
module.exports = router;
