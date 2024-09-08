const User = require('../models/User'); // Assuming the User model is defined

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users); // Respond with a JSON array of users
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params; // Extract user ID from the request parameters
    const user = await User.findById(userId); // Find user by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // User not found
    }
    res.status(200).json(user); // Respond with the found user
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Get user data from the request body
    const newUser = new User({ name, email, password }); // Create a new user instance

    await newUser.save(); // Save the user to the database
    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params; // Extract user ID from the request parameters
    const updatedData = req.body; // Get the updated data from the request body

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }); // Update user in the database

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' }); // User not found
    }
    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params; // Extract user ID from the request parameters
    const deletedUser = await User.findByIdAndDelete(userId); // Delete user from the database

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' }); // User not found
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

