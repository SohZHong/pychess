const { listAllSysUser } = require('../services/UserService');
const ResponseHelper = require('../models/ResponseHelper');

// List All System Users
const getAllSysUsers = async (req, res) => {
    const response = new ResponseHelper(res);
    try {
        const sysUsers = await listAllSysUser();
        response.success('Operation successful', sysUsers);
    } catch (error) {
        console.error(error);
        response.error('Error retrieving system users');
    }
}

module.exports = { getAllSysUsers }