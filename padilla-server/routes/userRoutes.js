const express = require('express');
const protect = require('../middleware/authMiddleware');

const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser
} = require('../controllers/userController');

const router = express.Router();

// PUBLIC ROUTE (NO PROTECT HERE)
router.post('/login', loginUser);

// USERS (PROTECTED)
router.route('/')
    .get(protect(["admin"]), getUsers)
    .post(createUser);

// USER MANAGEMENT (ADMIN ONLY)
router.route('/:id')
    .put(protect(["admin"]), updateUser)
    .delete(protect(["admin"]), deleteUser);

module.exports = router;