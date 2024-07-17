const { listAllUser, checkUsernameUnique, insertUser, updateUser, delUser, fullDeleteUser } = require('../../services/system/mainUserService');
const ResponseHelper = require('../../models/ResponseHelper');

// List All Users
const getAllGameUsers = async (req, res) => {
    const response = new ResponseHelper(res);
    try {
        const sysUsers = await listAllUser();
        response.success('Operation successful', sysUsers);
    } catch (error) {
        console.error(error);
        response.error('Error retrieving users');
    }
}
// Add New User
const addGameUser = async (req, res) => {
    const response = new ResponseHelper(res);
    try {
        const newUser = req.body;
        const isUsernameUnique = checkUsernameUnique(newUser.name);
        if (isUsernameUnique){
            await insertUser(newUser);
            response.success('User Inserted Successfully');
        } else {
            response.error('Username already exists');
        }
        
    } catch (error) {
        console.error(error);
        response.error('Error adding new users');
    }
}
// Update User
const updateGameUser = async( req, res ) => {
    const response = new ResponseHelper(res);
    try {
        const user = req.body;
        await updateUser(user);
        response.success('User Updated Successfully');
    } catch (error) {
        console.error(error);
        response.error('Error updating user');
    }
}
// Delete User (Changing del_flag to 1)
const deleteGameUsers = async(req, res) => {
    const response = new ResponseHelper(res);
    try {
        // Try to get from url (Single id)
        let userIds = req.params.id;
        // Multiple ids if there is no parameters in url
        if (!userIds) {
            userIds = req.body.ids;
        }
        await delUser(userIds);
        response.success('User Deleted Successfully');
    } catch (error) {
        console.error(error);
        response.error('Error deleting user');
    }
}
// Fully Deleting Users from database
const fullDeleteGameUsers = async(req, res) => {
    const response = new ResponseHelper(res);
    try {
        // Try to get from url (Single id)
        let userIds = req.params.id;
        // Multiple ids if there is no parameters in url
        if (!userIds) {
            userIds = req.body.ids;
        }
        await fullDeleteUser(userIds);
        response.success('User Deleted Successfully');
    } catch (error) {
        console.error(error);
        response.error('Error deleting user');
    }
}

module.exports = { getAllGameUsers, addGameUser, updateGameUser, deleteGameUsers, fullDeleteGameUsers }