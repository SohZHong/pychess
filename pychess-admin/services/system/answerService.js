const { dbQuery } = require('../../utils/dbUtils');

const listAllAnswer = async () => {
    const sql = `
    SELECT * FROM answer
    `;
    const answers = await dbQuery(sql);
    return answers.rows;
}

const insertAnswer = async (answer) => {
    const sql = `
    INSERT INTO answer
    (answer, create_by, update_by)
    VALUES
    (?, ?, ?)
    `
    const params = [
        answer.answer,
        answer.createBy,
        answer.updateBy
    ]
    const query = await dbQuery(sql, params);
    return query.rows;
}

const updateAnswer = async (answer) => {
    const sql = `
    UPDATE answer
    SET
    answer = ?,
    update_by = ?,
    update_time = ?
    WHERE id = ?;
    `;
    const params = [
        answer.answer,
        answer.updateBy,
        new Date(question.updateTime),
        answer.id
    ];
    const query = await dbQuery(sql, params);
    return query.rows;
}

const deleteAnswer = async (answerIds) => {
    let sql;
    const params = [answerIds]
    // Check if single or multiple ids
    if (Array.isArray(answerIds)){
        sql = `
        DELETE FROM answer 
        WHERE id in (?);
        `
    } else {
        sql = `
        DELETE FROM answer
        WHERE id = ?;
        `
    }
    const query = await dbQuery(sql, params);
    return query.rows;
}

module.exports = { listAllAnswer, insertAnswer, updateAnswer, deleteAnswer }