const ResponseHelper = require('../../models/ResponseHelper');
const { comparePassword } = require('../../utils/passwordUtils')
const { getSysUserByUsername } = require('../../services/sysUserService');
const { generateToken, verifyToken } = require('../../utils/tokenUtils');


// Register
const register = async(req, res) => {
    const response = new ResponseHelper(res);
    try {
        
    } catch (error) {
        
    }
}

const loginUser = async(req, res) => {
    const response = new ResponseHelper(res);
    try {
        const { username, password } = req.body;
        // const user =
    } catch (error) {
        console.error(error)
        response.error('Error retrieving user information')
    }
}

// Login for System Users
const loginSysUser = async(req, res) => {
    const response = new ResponseHelper(res);
    try {
        const { username, password } = req.body;
        const user = await getSysUserByUsername(username);
        // User not found
        if (!user) {
            response.error('Username does not exist!');
        } else {
            // If found, compare password
            const isPasswordValid = await comparePassword(password, user.password);
            // Invalid password
            if (!isPasswordValid) {
                response.error('Invalid password!');
            } else {
                // Generate token
                const token = generateToken({ id: user.id, username: user.name });
                console.log(token);
                // Set cookie
                response.setCookie('Token', token);
                // Send success message
                response.success('Login Successful');
            }
        }
    } catch (error) {
        console.error(error);
        response.error('Error retrieving system user information')
    }
}

// Retrieved current logged in user
const getLoggedInUser = async (req, res) => {
    // Get decoded 
    const user = req.user
    const response = new ResponseHelper(res);
    if (user){
        response.success('Current user retrieved successful', user)
    } else {
        response.error('Error retrieving current user')
    }
}

// Logout
const logout = async(req, res) => {
    const response = new ResponseHelper(res);
    req.session.destroy();
    res.clearCookie('Token')
    response.success('Logout success')
}

module.exports = { register, loginUser, logout, loginSysUser, getLoggedInUser }