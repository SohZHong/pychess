const express = require('express');
const { updateAppUser, retrieveUserByUsername } = require('../controllers/main/userController');
const { registerUser, loginUser, getLoggedInUser } = require('../controllers/main/authController');
const checkTokenMiddleware = require('../middleware/authToken');
const { startMatch, getUserMatchHistory, saveMatch } = require('../controllers/main/matchController');
const { saveUserScore } = require('../controllers/main/scoreController');
const router = express.Router();
// ----------- User -----------------
// Route to login
router.post('/login', loginUser);
// Route to register
router.post('/register', registerUser);
// Route to retrieve  user details
router.get('/getCurrentUser',checkTokenMiddleware, getLoggedInUser);
router.post('/getUserByUsername', checkTokenMiddleware, retrieveUserByUsername)
// ----------- Match -----------------
router.get('/getQuestions', checkTokenMiddleware, startMatch);
router.get('/getMatchHistory', checkTokenMiddleware, getUserMatchHistory);
router.post('/saveMatch', checkTokenMiddleware, saveMatch);
router.post('/saveMatchScore', checkTokenMiddleware, saveUserScore);
// ----------- Leaderboard -----------

// ----------- Settings --------------
// Route to update user information
router.put('/settings', checkTokenMiddleware, updateAppUser);

module.exports = router;