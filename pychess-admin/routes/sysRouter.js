const express = require('express');
const { getAllSysUsers, addSysUser, updateSysUser, deleteSysUsers, fullDeleteSysUsers } = require('../controllers/sysUserController');
const { loginSysUser } = require('../controllers/authController');
const checkTokenMiddleware = require('../middleware/authToken');
const router = express.Router();

// Route to login
router.post('/login', loginSysUser);
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
router.delete('/users/:id', checkTokenMiddleware, fullDeleteSysUsers); // Single update
router.delete('/users', checkTokenMiddleware, fullDeleteSysUsers); // Batch update

module.exports = router;
