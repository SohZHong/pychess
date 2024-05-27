const express = require('express');
const { getAllSysUsers } = require('../controllers/sysUserController');

const router = express.Router();

// Route to list all users
router.get('/users', getAllSysUsers);

module.exports = router;
