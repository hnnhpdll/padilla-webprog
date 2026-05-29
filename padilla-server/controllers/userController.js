const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ---------------- GET ALL USERS ----------------
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ---------------- CREATE USER ----------------
const createUser = async (req, res) => {
    try {
        const {
            password,
            type,
            firstName,
            lastName,
            username,
            email,
            age,
            gender,
            contactNumber,
            address
        } = req.body;

        if (!password) {
            return res.status(400).json({
                message: 'Password is required'
            });
        }

        // Default role = viewer
        const role = (type || 'viewer').toLowerCase().trim();

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            age,
            gender,
            contactNumber,
            address,
            type: role,
            password: hashedPassword
        });

        res.status(201).json(user);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// ---------------- UPDATE USER ----------------
const updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        if (req.body.type) {
            req.body.type = req.body.type.toLowerCase().trim();
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(user);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// ---------------- DELETE USER ----------------
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: 'User deleted successfully'
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// ---------------- LOGIN USER ----------------
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                message: 'Your account is inactive. Please contact support.'
            });
        }

        // Normalize role
        const role = (user.type || '').toLowerCase().trim();
        if (role === 'viewer') {
            return res.status(403).json({
                message: 'Access denied. Viewer accounts cannot log in.'
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                type: role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                type: role,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// ---------------- EXPORTS ----------------
module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser
};