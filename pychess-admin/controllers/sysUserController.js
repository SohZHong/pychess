const { listAllUser, checkUsernameUnique, insertUser, updateUser, delUser, fullDeleteUser } = require('../services/sysUserService');
const ResponseHelper = require('../models/ResponseHelper');

// List All System Users
const getAllSysUsers = async (req, res) => {
    const response = new ResponseHelper(res);
    try {
        const sysUsers = await listAllUser();
        response.success('Operation successful', sysUsers);
    } catch (error) {
        console.error(error);
        response.error('Error retrieving system users');
    }
}
// Add New System User
const addSysUser = async (req, res) => {
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
        response.error('Error adding new system users');
    }
}
// Update System User
const updateSysUser = async( req, res ) => {
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
// Delete System User (Changing del_flag to 1)
const deleteSysUsers = async(req, res) => {
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
        response.error('Error deleting system user');
    }
}
// Fully Deleting System Users from database
const fullDeleteSysUsers = async(req, res) => {
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
        response.error('Error deleting system user');
    }
}

module.exports = { getAllSysUsers, addSysUser, updateSysUser, deleteSysUsers, fullDeleteSysUsers }