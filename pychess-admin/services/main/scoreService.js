const { dbQuery, dbMultiQuery } = require('../../utils/dbUtils');

const insertScoreTransaction = async (userIds, scores) => {
    const queries = [];
    const params = [];

    // Check if userIds and scores are arrays
    const isMultiple = Array.isArray(userIds) && Array.isArray(scores);

    // Add into score_transaction table
    const scoreSql = `
    INSERT INTO score_transaction
    (user_id, score_acquired)
    VALUES (?, ?)
    `;

    // Update user score
    const userSql = `
    UPDATE user
    SET score = score + ?
    WHERE id = ?
    `;

    if (isMultiple) {
        // Ensure the length of userIds and scores are the same
        if (userIds.length !== scores.length) {
            throw new Error('The length of userIds and scores must be the same.');
        }


        userIds.forEach((userId, index) => {
            const score = scores[index];
            const scoreParams = [userId, score];
            const userParams = [score, userId];

            queries.push(scoreSql, userSql);
            params.push(scoreParams, userParams);
        });
    } else {
        const scoreParams = [userIds, scores];
        const userParams = [scores, userIds];

        queries.push(scoreSql, userSql);
        params.push(scoreParams, userParams);
    }

    const res = await dbMultiQuery(queries, params);

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