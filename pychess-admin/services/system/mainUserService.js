const { dbQuery } = require('../../utils/dbUtils');
const { encryptPassword } = require('../../utils/passwordUtils')

const listAllUser = async () => {
    const sql = `SELECT * FROM user WHERE del_flag != 1`;
    const sysUsers = await dbQuery(sql);
    return sysUsers.rows;
}

const getMainUserByUsername = async (username) => {
    const sql = `
    SELECT * from user
    WHERE name = ? AND del_flag != 1
    `
    const res = await dbQuery(sql, [username]);
    return res.rows[0];
}

const checkUsernameUnique = async (username) => {
    const user = await getMainUserByUsername(username)
    // If username is found
    return (user == null)
}

const insertUser = async (user) => {
    const sql = `
    INSERT INTO user
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
    UPDATE user
    SET
    name = ?,
    password = ?,
    email = ?,
    status = ?,
    score = ?,
    update_by = ?,
    update_time = ?
    WHERE id = ?;
    `;
    const params = [
        user.name,
        user.password,
        user.email,
        user.status,
        user.score,
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
        UPDATE user
        SET
        del_flag = '1'
        WHERE id in (?);
        `
    } else {
        sql = `
        UPDATE user
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
        DELETE FROM user 
        WHERE id in (?);
        `
    const res = await dbQuery(sql, params);
    return res.rows;
}

module.exports = { listAllUser, getMainUserByUsername, checkUsernameUnique, insertUser, updateUser, delUser, fullDeleteUser }