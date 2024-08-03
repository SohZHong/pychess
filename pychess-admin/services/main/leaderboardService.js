const { dbMultiQuery } = require('../../utils/dbUtils');

const getLeaderboardStatistics = async (userId) => {
    const sql1 = `
    WITH UserStats AS (
        SELECT u.id, u.name, u.score,
            COUNT(CASE WHEN mh.winner_id = u.id THEN 1 END) AS wins,
            COUNT(CASE WHEN mh.loser_id = u.id THEN 1 END) AS losses,
            COUNT(mh.id) AS matches
        FROM user u
        LEFT JOIN match_history mh 
        ON u.id = mh.winner_id OR u.id = mh.loser_id
        GROUP BY u.id
    )
    SELECT 
        id, name, score, wins, matches
    FROM UserStats
    ORDER BY wins DESC
    LIMIT 10;
    `;
    
    const sql2 = `
    SELECT 
        u.id, u.name, u.score, COUNT(mh.id) AS wins,
        (SELECT COUNT(*) + 1 
         FROM (SELECT COUNT(*) AS win_count
               FROM match_history mh2 
               INNER JOIN user u2 ON u2.id = mh2.winner_id 
               GROUP BY u2.id) AS subquery
         WHERE win_count > (SELECT COUNT(*)
                            FROM match_history mh3 
                            WHERE mh3.winner_id = u.id)) AS \`rank\`,
        (SELECT COUNT(*) FROM match_history mh_all WHERE mh_all.winner_id = u.id OR mh_all.loser_id = u.id) AS matches
    FROM match_history mh
    INNER JOIN user u ON u.id = mh.winner_id
    WHERE u.id = ?
    GROUP BY u.id;
    `;
    const queries = [sql1, sql2];
    const params = [[], [userId]];
    const res = await dbMultiQuery(queries, params);
    return {
        top10: res[0].rows,
        user: res[1].rows[0]
    };
}

module.exports = { getLeaderboardStatistics }