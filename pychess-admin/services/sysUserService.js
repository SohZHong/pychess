const { dbQuery } = require('../utils/dbUtils');
const { encryptPassword } = require('../utils/passwordUtils')

const listAllUser = async () => {
    const sql = `SELECT * FROM sys_user`;
    const sysUsers = await dbQuery(sql);
    return sysUsers;
}

const getSysUserByUsername = async (username) => {
    const sql = `
    SELECT * from sys_user
    WHERE name = ?
    `
    const res = await dbQuery(sql, [username]);
    return res[0];
}

const checkUsernameUnique = async (username) => {
    const user = await getSysUserByUsername(username)
    // If username is found
    return (user == null)
}

const insertUser = async (user) => {
    const sql = `
    INSERT INTO sys_user
    (name, password, email, create_by, update_by)
    VALUES
    (?, ?, ?, ?, ?)
    `
    const encryptedPassword = await encryptPassword(user.password)
    const params = [
        user.name,
        encryptedPassword,
        user.email,
        user.createBy,
        user.updateBy
    ]
    const res = await dbQuery(sql, params);
    return res;
}

const updateUser = async (user) => {
    const sql = `
    UPDATE sys_user
    SET
    name = ?,
    password = ?,
    email = ?,
    status = ?,
    update_by = ?,
    update_time = ?
    WHERE id = ?;
    `;
    const params = [
        user.name,
        user.password,
        user.email,
        user.status,
        user.updateBy,
        new Date(user.updateTime),
        user.id
    ];
    const res = await dbQuery(sql, params);
    return res;
}   

const delUser = async (userIds) => {
    let sql;
    const params = [userIds]
    // Check if single or multiple ids
    if (Array.isArray(userIds)){
        sql = `
        UPDATE sys_user
        SET
        del_flag = '1'
        WHERE id in (?);
        `
    } else {
        sql = `
        UPDATE sys_user
        SET
        del_flag = '1'
        WHERE id = ?;
        `
    }
    const res = await dbQuery(sql, params);
    return res;
}


const fullDeleteUser = async (userIds) => {
    let sql;
    const params = [userIds]
    // Check if single or multiple ids
    if (Array.isArray(userIds)){
        sql = `
        DELETE FROM sys_user 
        WHERE id in (?);
        `
    } else {
        sql = `
        DELETE FROM sys_user
        WHERE id = ?;
        `
    }
    const res = await dbQuery(sql, params);
    return res;
}

module.exports = { listAllUser, getSysUserByUsername, checkUsernameUnique, insertUser, updateUser, delUser, fullDeleteUser }