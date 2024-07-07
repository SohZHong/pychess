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
    UPDATE user
    SET ${fieldsToUpdate.join(', ')}
    WHERE id = ?;
    `;

    const res = await dbQuery(sql, params);
    return res.rows;
}   

module.exports = { getUserByUsername, checkUsernameUnique, register, updateUser }