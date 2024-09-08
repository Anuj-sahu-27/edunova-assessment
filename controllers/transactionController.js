const Transaction = require('../models/Transaction'); 
const Book = require('../models/Book'); 
const User = require('../models/User'); 
const moment = require('moment'); 

exports.issueBook = async (req, res) => {
  try {
    const { bookName, userId, issueDate } = req.body;

    const book = await Book.findOne({ name: bookName });
    const user = await User.findById(userId);

    if (!book || !user) {
      return res.status(400).json({ message: 'Book or User not found' });
    }

    const existingTransaction = await Transaction.findOne({ bookId: book._id, returnDate: null });
    if (existingTransaction) {
      return res.status(400).json({ message: 'Book is already issued' });
    }

    const newTransaction = new Transaction({
      bookId: book._id,
      userId: user._id,
      issueDate,
      status: 'issued'
    });

    await newTransaction.save();
    res.status(201).json({ message: 'Book issued successfully', newTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Error issuing book', error });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { bookName, userId, returnDate } = req.body;

    const book = await Book.findOne({ name: bookName });
    const user = await User.findById(userId);

    if (!book || !user) {
      return res.status(400).json({ message: 'Book or User not found' });
    }

    const transaction = await Transaction.findOne({
      bookId: book._id,
      userId: user._id,
      returnDate: null
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found or book already returned' });
    }

    const issueDate = moment(transaction.issueDate);
    const returnDateMoment = moment(returnDate);
    if (returnDateMoment.isBefore(issueDate)) {
      return res.status(400).json({ message: 'Return date cannot be before issue date' });
    }
    
    const daysRented = returnDateMoment.diff(issueDate, 'days');
    const totalRent = daysRented * book.rentPerDay;

    transaction.returnDate = returnDate;
    transaction.totalRent = totalRent;
    transaction.status = 'returned';

    await transaction.save();
    res.status(200).json({ message: 'Book returned successfully', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error returning book', error });
  }
};

exports.getBookIssuers = async (req, res) => {
  try {
    const { bookName } = req.params;

    const book = await Book.findOne({ name: bookName });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const transactions = await Transaction.find({ bookId: book._id }).populate('user');
    const issuers = transactions.map(trans => ({
      user: trans.user.name,
      issueDate: trans.issueDate,
      returnDate: trans.returnDate
    }));

    res.status(200).json({
      totalIssuers: issuers.length,
      issuers
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book issuers', error });
  }
};

exports.getTotalRentByBook = async (req, res) => {
  try {
    const { bookName } = req.params;

    const book = await Book.findOne({ name: bookName });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const transactions = await Transaction.find({ bookId: book._id, returnDate: { $ne: null } });
    const totalRent = transactions.reduce((sum, trans) => {
      const issueDate = moment(trans.issueDate);
      const returnDateMoment = moment(trans.returnDate);
      const daysRented = returnDateMoment.diff(issueDate, 'days');
      return sum + (daysRented * book.rentPerDay);
    }, 0);

    res.status(200).json({ bookName, totalRent });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total rent', error });
  }
};

exports.getBooksIssuedToUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const transactions = await Transaction.find({ userId: user._id }).populate('book');
    const booksIssued = transactions.map(trans => ({
      bookName: trans.book.name,
      issueDate: trans.issueDate,
      returnDate: trans.returnDate
    }));

    res.status(200).json(booksIssued);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books issued to user', error });
  }
};

exports.getBooksIssuedInDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!moment(startDate).isValid() || !moment(endDate).isValid()) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const transactions = await Transaction.find({
      issueDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).populate('book').populate('user');

    const issuedBooks = transactions.map(trans => ({
      bookName: trans.book.name,
      userName: trans.user.name,
      issueDate: trans.issueDate,
      returnDate: trans.returnDate
    }));

    res.status(200).json(issuedBooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books issued in date range', error });
  }
};
