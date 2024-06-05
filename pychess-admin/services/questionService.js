const { dbQuery, dbMultiQuery, transaction } = require('../utils/dbUtils');

const listAllQuestionWithAnswers = async () => {
    const sql = `
    SELECT
        q.id,
        cp.id AS chess_piece_id,
        cp.name AS chess_piece, 
        q.text AS question_text,
        qt.id AS question_type_id,
        qt.type AS question_type,
        a.id AS answer_id,
        a.answer AS answer_text
    FROM question q
    JOIN chess_piece cp ON q.chess_piece_id = cp.id
    JOIN question_type qt ON q.question_type_id = qt.id
    JOIN question_to_answer q2a ON q.id = q2a.question_id
    JOIN answer a ON q2a.answer_id = a.id
    ORDER BY q.id, a.id;
    `;
    const questionDetails = await dbQuery(sql);
    const questionsMap = new Map();

    // Format the results
    questionDetails.rows.forEach(row => {
        // Retrieve the values based on key
        const { id, chess_piece_id, chess_piece, question_text, question_type_id, question_type, answer_id, answer_text } = row;
        // Separate each question
        if (!questionsMap.has(question_text)){
            questionsMap.set(question_text, {
                id,
                chess_piece_id,
                chess_piece,
                question_text,
                question_type_id,
                question_type,
                answers: []
            });
        }
        // Add answers to answer array of each question
        questionsMap.get(question_text).answers.push({
            id: answer_id,
            answer: answer_text
        });
    })
    return Array.from(questionsMap.values());
}

const listAllQuestionType = async () => {
    const sql = `
    SELECT * from question_type
    `
    const questionTypes = await dbQuery(sql);
    return questionTypes.rows;
}
// Example JSON
// {
//     "id": 1,
//     "text": "New question",
//     "questionTypeId": 1,
//     "chessPieceId": 2,
//     "createBy": 'Zhe Hong',
//     "updateBy": 'Zhe Hong',
//     "answers": ["New answer 1", "New answer 2", "New answer 3", "New answer 4"]
// }
const insertQuestion = async (question) => {
    return transaction(async (connection) => {
        // Insert the question first
        const questionSql = `
            INSERT INTO question
            (text, chess_piece_id, question_type_id, create_by, update_by)
            VALUES (?, ?, ?, ?, ?);
        `;
        const questionParams = [
            question.text,
            question.chessPieceId,
            question.questionTypeId,
            question.createBy,
            question.updateBy
        ];
        // Destructure to get result and fields, and extract insertId
        const [questionResult] = await connection.query(questionSql, questionParams);
        const questionId = questionResult.insertId;
        
        // Insert associated answers
        const answers = question.answers || [];
        const answerQueries = answers.map(answer => ({
            sql: 'INSERT INTO answer (answer, create_by, update_by) VALUES (?, ?, ?)',
            params: [answer, question.createBy, question.updateBy]
        }));

        const answerResults = await Promise.all(answerQueries.map(query => connection.query(query.sql, query.params)));
        // Get generated ID and insert into array
        const answerIds = answerResults.map(([result]) => result.insertId);

        // Insert associations between question and answers
        const questionToAnswerSql = `
            INSERT INTO question_to_answer (question_id, answer_id, create_by, update_by)
            VALUES (?, ?, ?, ?);
        `;
        const questionToAnswerParams = answerIds.map(answerId => [questionId, answerId, question.createBy, question.updateBy]);

        const res = await Promise.all(questionToAnswerParams.map(params => connection.query(questionToAnswerSql, params)));

        return res;
    })
}

const updateQuestion = async (question) => {
    // Update the question text
    const questionSql = `
        UPDATE question 
        SET
            text = ?,
            update_by = ?,
            update_time = ?
        WHERE id = ?;
    `;
    const questionParams = [
        question.text,
        question.updateBy,
        new Date(),
        question.id
    ];
    await dbQuery(questionSql, questionParams);

    // Update existing answers
    const updateAnswerQueries = [];
    const updateAnswerParams = [];

    question.answers.forEach(answer => {
        updateAnswerQueries.push('UPDATE answer SET answer = ?, update_by = ?, update_time = ? WHERE id = ?');
        updateAnswerParams.push([answer.answer, question.updateBy, new Date(), answer.id]);
    });

    // Execute update queries for existing answers
    const res = await dbMultiQuery(updateAnswerQueries, updateAnswerParams);
    return res;
};

// Example JSON
// {
//     "ids": [1, 2, 3]
// }
const deleteQuestion = async (questionIds) => {
    // Convert to array for consistent processing
    const params = [questionIds];
    // Delete questions
    const sql = `
        DELETE FROM question
        WHERE id IN (?);
    `;
    const res = dbQuery(sql, params);
    return res;
}

module.exports = { listAllQuestionWithAnswers, listAllQuestionType, insertQuestion, updateQuestion, deleteQuestion }