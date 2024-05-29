const express = require('express');
const { getAllSysUsers, addSysUser, updateSysUser, deleteSysUsers, fullDeleteSysUsers } = require('../controllers/sysUserController');

const router = express.Router();

// Route to list all users
router.get('/users', getAllSysUsers);
// Route to add new user
router.post('/users', addSysUser);
// Route to update user
router.put('/users', updateSysUser);
// Route to update user del_flag to 1
router.patch('/users/:id', deleteSysUsers); // Single update
router.patch('/users', deleteSysUsers); // Batch update
// Route to fully delete user(s)
router.delete('/users/:id', fullDeleteSysUsers); // Single update
router.delete('/users', fullDeleteSysUsers); // Batch update

module.exports = router;
