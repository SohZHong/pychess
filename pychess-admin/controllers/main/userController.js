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

module.exports = { updateAppUser };