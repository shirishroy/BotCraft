const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require('express-validator');

const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key";

// User registration route
router.post('/createuser', [
    body('Bio').not().isEmpty(),
    body('name').not().isEmpty(),
    body('email').isEmail(),
    body('Interest').not().isEmpty(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { Bio, name, email, Interest, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = await User.create({
            Bio,
            name,
            email,
            Interest,
            password: hashedPassword
        });

        // Create and send JWT token
        const payload = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        res.json({ success: true, authToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "An error occurred while creating the user." });
    }
});

// User login route
router.post('/loginuser', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Create and send JWT token
        const payload = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        res.json({ success: true, authToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "An error occurred while logging in." });
    }
});

module.exports = router;
