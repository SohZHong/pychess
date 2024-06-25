const { dbQuery } = require('../../utils/dbUtils');
const { encryptPassword } = require('../../utils/passwordUtils');

const getUserByUsername = async (username) => {
    const sql = `
    SELECT * from user
    WHERE name = ? AND del_flag != 1
    `
    const res = await dbQuery(sql, [username]);
    return res.rows[0];
}

const checkUsernameUnique = async (username) => {
    const user = await getUserByUsername(username);
    return (user == null);
}

const register = async (username, password, email) => {
    const encryptedPassword = await encryptPassword(password);
    const params = [username, encryptedPassword, email, username, username];
    const sql = `
    INSERT INTO user
    (name, password, email, create_by, update_by)
    VALUES (?, ?, ?, ?, ?)
    `
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
    update_by = ?,
    update_time = ?
    WHERE id = ?;
    `;
    const params = [
        user.name,
        user.password,
        user.email,
        user.updateBy,
        new Date(user.updateTime),
        user.id
    ];
    const res = await dbQuery(sql, params);
    return res.rows;
}   

module.exports = { getUserByUsername, checkUsernameUnique, register, updateUser }