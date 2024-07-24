const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');
const authMiddleware = require('../middleware/Auth'); // Import your auth middleware

// Register account route
router.post('/register', accountController.registerAccount);

// Login account route
router.post('/login', accountController.loginAccount);

// Edit user profile route (protected)
router.put('/edit/:id', authMiddleware, accountController.editUser);

// Delete user account route (protected)
router.delete('/delete/:id', authMiddleware, accountController.deleteUser);

module.exports = router;
