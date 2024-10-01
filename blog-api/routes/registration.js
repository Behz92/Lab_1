const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import User model
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered successfully');
});

module.exports = router;
