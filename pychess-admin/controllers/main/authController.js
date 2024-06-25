const ResponseHelper = require('../../models/ResponseHelper');
const { comparePassword } = require('../../utils/passwordUtils')
const { getUserByUsername, register } = require('../../services/main/userService');
const { getSysUserByUsername } = require('../../services/system/sysUserService');
const { generateToken } = require('../../utils/tokenUtils');


// Register
const registerUser = async(req, res) => {
    const response = new ResponseHelper(res);
    try {
        const { username, password, email } = req.body;
        const user = await getUserByUsername(username);
        // User not registered
        if (!user) {
            await register(username, password, email);
            response.success('Registration Successful');
        } else {
            response.error('Username exists!');
        }
    } catch (error) {
        console.error(error);
        response.error('Error registering user');
    }
}

// Login for Users
const loginUser = async(req, res) => {
    const response = new ResponseHelper(res);
    try {
        const { username, password } = req.body;
        const user = await getUserByUsername(username);
        // User not found
        if (!user) {
            response.error('Username does not exist!');
        // User suspended
        } else if (user.status === 1) {
            response.error('User has been suspended or deleted')
        } else {
            // If found, compare password
            const isPasswordValid = await comparePassword(password, user.password);
            // Invalid password
            if (!isPasswordValid) {
                response.error('Invalid password!');
            } else {
                // Generate token
                const token = generateToken({ id: user.id, username: user.name });
                // Set cookie
                response.setCookie('Token', token);
                // Send success message
                response.success('Login Successful');
            }
        }
    } catch (error) {
        console.error(error);
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
        response.success('User data retrieved successful', user)
    } else {
        response.error('Error retrieving current user')
    }
}

// Logout
const logout = async(req, res) => {
    const response = new ResponseHelper(res);
    req.session.destroy();
    res.clearCookie('Token');
    response.success('Logout success');
}

module.exports = { registerUser, loginUser, logout, loginSysUser, getLoggedInUser }