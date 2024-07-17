const express = require('express');
const { getAllSysUsers, addSysUser, updateSysUser, deleteSysUsers, fullDeleteSysUsers, updateSysUserSettings } = require('../controllers/system/sysUserController');
const { getAllGameUsers, addGameUser, updateGameUser, deleteGameUsers, fullDeleteGameUsers } = require('../controllers/system/mainUserController');
const { getAllQuestionWithAnswers, getAllQuestionType, addQuestion, modifyQuestion, fullDeleteQuestion } = require('../controllers/system/questionController');
const { getAllChessPieces, addChessPiece, modifyChessPiece, fullDeleteChessPiece } = require('../controllers/system/chessController');
const { loginSysUser, getLoggedInUser } = require('../controllers/main/authController');
const checkTokenMiddleware = require('../middleware/authToken');
const router = express.Router();

// Route to login
router.post('/login', loginSysUser);

// Route to retrieve current user details
router.get('/getCurrentUser',checkTokenMiddleware, getLoggedInUser);

// ----------- System Users -----------
// Route to list all users
router.get('/sys_users', checkTokenMiddleware, getAllSysUsers);
// Route to add new user
router.post('/sys_users', checkTokenMiddleware, addSysUser);
// Route to update user
router.put('/sys_users', checkTokenMiddleware, updateSysUser);
// Route to update user del_flag to 1
router.patch('/sys_users/:id', checkTokenMiddleware, deleteSysUsers); // Single update
router.patch('/sys_users', checkTokenMiddleware, deleteSysUsers); // Batch update
// Route to fully delete user(s)
router.delete('/sys_users/:id', checkTokenMiddleware, fullDeleteSysUsers); // Single delete
router.delete('/sys_users', checkTokenMiddleware, fullDeleteSysUsers); // Batch 
// ----------- Users -----------
// Route to list all users
router.get('/users', checkTokenMiddleware, getAllGameUsers);
// Route to add new user
router.post('/users', checkTokenMiddleware, addGameUser);
// Route to update user
router.put('/users', checkTokenMiddleware, updateGameUser);
// Route to update user del_flag to 1
router.patch('/users/:id', checkTokenMiddleware, deleteGameUsers); // Single update
router.patch('/users', checkTokenMiddleware, deleteGameUsers); // Batch update
// Route to fully delete user(s)
router.delete('/users/:id', checkTokenMiddleware, fullDeleteGameUsers); // Single delete
router.delete('/users', checkTokenMiddleware, fullDeleteGameUsers); // Batch delete
// ----------- Settings -----------
router.put('/settings', checkTokenMiddleware, updateSysUserSettings)
// ----------- Questions and Chess Piece -----------
// Route to list all questions and chess piece
router.get('/questions', checkTokenMiddleware, getAllQuestionWithAnswers);
router.get('/questions/type', checkTokenMiddleware, getAllQuestionType);
router.get('/questions/chess', checkTokenMiddleware, getAllChessPieces);
// Route to add new question and chess piece
router.post('/questions', checkTokenMiddleware, addQuestion);
router.post('/questions/chess', checkTokenMiddleware, addChessPiece);
// Route to update question and chess piece
router.put('/questions', checkTokenMiddleware, modifyQuestion);
router.patch('/questions/chess', checkTokenMiddleware, modifyChessPiece);
// Route to delete questions and chess piece
router.delete('/questions/:id', checkTokenMiddleware, (req, res, next) => {
    // Added checks to prevent matching other routes
    const id = parseInt(req.params.id, 10);
    if (!isNaN(id)) {
        fullDeleteQuestion(req, res, next);
    } else {
        next('route');
    }
});
router.delete('/questions/chess/:id', checkTokenMiddleware, (req, res, next) => {
    // Added checks to prevent matching other routes
    const id = parseInt(req.params.id, 10);
    if (!isNaN(id)) {
        fullDeleteChessPiece(req, res, next);
    } else {
        next('route');
    }
});
router.delete('/questions', checkTokenMiddleware, fullDeleteQuestion); // Batch delete
router.delete('/questions/chess', checkTokenMiddleware, fullDeleteChessPiece); // Batch delete

module.exports = router;
