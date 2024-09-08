const Book = require('../models/Book'); // Assuming the Book model is defined

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books from the database
    res.status(200).json(books); // Respond with a JSON array of books
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const { bookId } = req.params; // Extract book ID from the request parameters
    const book = await Book.findById(bookId); // Find book by ID

    if (!book) {
      return res.status(404).json({ message: 'Book not found' }); // Book not found
    }
    res.status(200).json(book); // Respond with the found book
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, category, rentPerDay } = req.body; // Get book data from the request body
    const newBook = new Book({ title, category, rentPerDay }); // Create a new book instance

    await newBook.save(); // Save the book to the database
    res.status(201).json({ message: 'Book created successfully', newBook });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
};

// Update an existing book
exports.updateBook = async (req, res) => {
  try {
    const { bookId } = req.params; // Extract book ID from the request parameters
    const updatedData = req.body; // Get the updated data from the request body

    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, { new: true }); // Update book in the database

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' }); // Book not found
    }
    res.status(200).json({ message: 'Book updated successfully', updatedBook });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params; // Extract book ID from the request parameters
    const deletedBook = await Book.findByIdAndDelete(bookId); // Delete book from the database

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' }); // Book not found
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};
