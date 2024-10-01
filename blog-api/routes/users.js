const express = require('express');
const User = require('../models/User'); // Import the User model
const router = express.Router();
const authenticateToken = require('../middleware/authenticate'); // Import authentication middleware

// 1. GET /users - Retrieve all users (Protected route)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await User.find(); // Fetch users from MongoDB
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// 2. GET /users/:id - Retrieve a specific user by their ID (Protected route)
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Find user by ID
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// 3. PUT /users/:id - Update an existing user by their ID (Protected route)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');

        // Update user's name and email, or keep original values
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// 4. DELETE /users/:id - Delete a user by their ID (Protected route)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');

        await user.remove();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;
