const express = require('express');
const { updateAppUser } = require('../controllers/main/userController');
const { registerUser, loginUser, getLoggedInUser } = require('../controllers/main/authController');
const checkTokenMiddleware = require('../middleware/authToken');
const router = express.Router();

// Route to login
router.post('/login', loginUser);
// Route to register
router.post('/register', registerUser);
// Route to retrieve current user details
router.get('/getCurrentUser',checkTokenMiddleware, getLoggedInUser);

// ----------- Settings -----------
// Route to update user information
router.put('/settings', checkTokenMiddleware, updateAppUser);

module.exports = router;