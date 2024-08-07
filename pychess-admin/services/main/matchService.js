const { dbQuery } = require('../../utils/dbUtils');

const insertMatchHistory = async (winner, loser) => {
    const sql = `
    INSERT INTO match_history
    (winner_id, loser_id)
    SELECT ?, ?
    FROM DUAL
    WHERE NOT EXISTS (
        SELECT * FROM match_history mh
        WHERE (mh.winner_id = ? OR mh.loser_id = ?)
        AND mh.end_time >= NOW() - INTERVAL 15 MINUTE
    )
    `
    const params = [winner, loser, winner, loser]
    const res = dbQuery(sql, params)
    return res.rows
}

const listUserMatchHistory = async (user) => {
    const sql = `
    SELECT w.name AS winner, l.name AS loser, mh.end_time AS end
    FROM match_history mh
    JOIN user w ON mh.winner_id = w.id
    JOIN user l ON mh.loser_id = l.id
    WHERE mh.winner_id = ? OR mh.loser_id = ?
    `
    const res = await dbQuery(sql, [user, user])
    return res.rows
}

module.exports = { insertMatchHistory, listUserMatchHistory }