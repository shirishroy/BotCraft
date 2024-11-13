const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.use(express.json());

// Get User Endpoint
router.post('/getUser', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name }); // Query by name or another unique identifier
        if (user) {
            res.status(200).json({
                success: true,
                user
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Helper Function to Check if User Exists
async function checkIsUser(name) {
    try {
        const user = await User.findOne({ name });
        return user ? true : false;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// Helper Function to Create User
async function createUser(userData) {
    try {
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        return savedUser;
    } catch (err) {
        console.log(err);
        return null;
    }
}

// Create User Endpoint
router.post('/createUser', async (req, res) => {
    const { name, age, interest, role } = req.body;

    // Validate required fields
    if (!name || !age || !interest || !role) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const user = new User({
            name,
            age,
            interest,
            role,
        });
        await user.save();
        res.status(201).json({
            success: true,
            message: 'User created successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Update User Endpoint
router.post('/updateUser', async (req, res) => {
    const { name, age, interest, role } = req.body;

    // Validate required fields
    if (!name) {
        return res.status(400).json({ success: false, message: 'Name is required for updating' });
    }

    const isUser = await checkIsUser(name);

    if (!isUser) {
        // If the user doesn't exist, create a new user
        const newUser = await createUser(req.body);
        if (newUser) {
            return res.status(201).json({
                success: true,
                message: 'User created successfully',
                user: newUser
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    try {
        const user = await User.findOne({ name });
        if (user) {
            // Update only the fields that are provided
            user.age = age || user.age;
            user.interest = interest || user.interest;
            user.role = role || user.role;

            const updatedUser = await user.save();
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                user: updatedUser
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;
