const { dbQuery } = require('../../utils/dbUtils');

const insertScoreTransaction = async (userId, score) => {
    const sql = `
    INSERT INTO score_transaction
    (user_id, score_acquired)
    VALUES (?, ?)
    `;
    const res = await dbQuery(sql, [userId, score]);

    return res.rows;
}

const listUserScoreTransaction = async (user) => {
    const sql = `
    SELECT st.score_acquired, st.transaction_time
    FROM score_transaction st
    JOIN user u ON st.user_id = u.id
    WHERE st.user_id = ?
    `
    const res = await dbQuery(sql, [user])
    return res.rows
}

module.exports = { insertScoreTransaction, listUserScoreTransaction }