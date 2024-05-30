const ResponseHelper = require('../models/ResponseHelper');
const { encryptPassword, comparePassword } = require('../utils/passwordUtils')
const { getSysUserByUsername } = require('../services/sysUserService');
const { generateToken } = require('../utils/tokenUtils');


// Register
const register = async(req, res) => {
    const response = new ResponseHelper(res);
    try {
        
    } catch (error) {
        
    }
}

// Login for System Users
const loginSysUser = async(req, res) => {
    const response = new ResponseHelper(res);
    try {
        const { username, password } = req.body;
        const user = await getSysUserByUsername(username);
        // User not found
        if (!user) response.error('Username does not exist!');

        // If found, compare password
        const encryptedPassword = await encryptPassword(password);
        const isPasswordValid = await comparePassword(encryptedPassword, user.password);
        // Invalid password
        if (!isPasswordValid) response.error('Invalid password!');

        // Generate token
        const token = generateToken({ id: user.id, username: user.username });
        // Set cookie
        response.setCookie('Token-Admin', token);
        // Send success message
        response.success('Login Successful', token);
    } catch (error) {
        console.error(error);
        response.error('Error retrieving user information')
    }
}

// Logout
const logout = async(req, res) => {
    const response = new ResponseHelper(res);
    req.session.destroy();
    response.success('Logout success')
}

module.exports = { login, logout }