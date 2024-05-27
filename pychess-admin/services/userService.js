const { dbQuery } = require('../utils/dbUtils');

const listAllSysUser = async () => {
    const sql = `SELECT * FROM sys_user`;
    const sysUsers = await dbQuery(sql);
    return sysUsers;
}

module.exports = { listAllSysUser }