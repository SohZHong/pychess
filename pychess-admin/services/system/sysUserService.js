const { dbQuery } = require('../../utils/dbUtils');
const { encryptPassword } = require('../../utils/passwordUtils')

const listAllUser = async () => {
    const sql = `SELECT * FROM sys_user WHERE del_flag != 1`;
    const sysUsers = await dbQuery(sql);
    return sysUsers.rows;
}

const getSysUserByUsername = async (username) => {
    const sql = `
    SELECT * from sys_user
    WHERE name = ? AND del_flag != 1
    `
    const res = await dbQuery(sql, [username]);
    return res.rows[0];
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
    return res.rows;
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
    return res.rows;
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
    return res.rows;
}


const fullDeleteUser = async (userIds) => {
    const params = [userIds]
    const sql = `
        DELETE FROM sys_user 
        WHERE id in (?);
        `
    const res = await dbQuery(sql, params);
    return res.rows;
}

const updateUserSettings = async (user) => {
    const fieldsToUpdate = [];
    const params = [];

    fieldsToUpdate.push('name = ?');
    params.push(user.name);

    // Add password only if its specified
    if (user.password) {
        const encryptedPassword = await encryptPassword(user.password);
        fieldsToUpdate.push('password = ?');
        params.push(encryptedPassword);
    }

    fieldsToUpdate.push('email = ?');
    params.push(user.email);

    fieldsToUpdate.push('update_by = ?');
    params.push(user.updateBy);

    fieldsToUpdate.push('update_time = ?');
    params.push(new Date(user.updateTime));

    params.push(user.id); // The id parameter for the WHERE clause

    const sql = `
    UPDATE sys_user
    SET ${fieldsToUpdate.join(', ')}
    WHERE id = ?;
    `;

    const res = await dbQuery(sql, params);
    return res.rows;
}   

module.exports = { listAllUser, getSysUserByUsername, checkUsernameUnique, insertUser, updateUser, delUser, fullDeleteUser, updateUserSettings }