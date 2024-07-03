const { updateUser } = require('../../services/main/userService');
const ResponseHelper = require('../../models/ResponseHelper');

// Update User
const updateAppUser = async( req, res ) => {
    const response = new ResponseHelper(res);
    try {
        const user = req.body;
        await updateUser(user);
        response.success('User Updated Successfully');
    } catch (error) {
        console.error(error);
        response.error('Error updating system user');
    }
}

// Get User by Username
const retrieveUserByUsername = async ( req, res ) => {
    const response = new ResponseHelper(res);
    try {
        const { username } = req.body;
        const user = await getUserByUsername(username);
        response.success('User Retrieved Successfully', user);
    } catch (error) {
        console.error(error);
        response.error('Username does not exist!');
    }
}

module.exports = { updateAppUser, retrieveUserByUsername };