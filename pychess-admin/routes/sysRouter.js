const express = require('express');
const { getAllSysUsers, addSysUser, updateSysUser, deleteSysUsers, fullDeleteSysUsers } = require('../controllers/system/sysUserController');
const { getAllQuestionWithAnswers, getAllQuestionType, addQuestion, modifyQuestion, fullDeleteQuestion } = require('../controllers/system/questionController');
const { getAllChessPieces, addChessPiece, modifyChessPiece, fullDeleteChessPiece } = require('../controllers/system/chessController');
const { loginSysUser, getLoggedInUser } = require('../controllers/system/authController');
const checkTokenMiddleware = require('../middleware/authToken');
const router = express.Router();

// Route to login
router.post('/login', loginSysUser);

// Route to retrieve current user details
router.get('/getCurrentUser',checkTokenMiddleware, getLoggedInUser);

// ----------- Users -----------
// Route to list all users
router.get('/users', checkTokenMiddleware, getAllSysUsers);
// Route to add new user
router.post('/users', checkTokenMiddleware, addSysUser);
// Route to update user
router.put('/users', checkTokenMiddleware, updateSysUser);
// Route to update user del_flag to 1
router.patch('/users/:id', checkTokenMiddleware, deleteSysUsers); // Single update
router.patch('/users', checkTokenMiddleware, deleteSysUsers); // Batch update
// Route to fully delete user(s)
router.delete('/users/:id', checkTokenMiddleware, fullDeleteSysUsers); // Single delete
router.delete('/users', checkTokenMiddleware, fullDeleteSysUsers); // Batch delete

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
