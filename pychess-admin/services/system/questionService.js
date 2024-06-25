const { dbQuery, dbMultiQuery, transaction } = require('../../utils/dbUtils');

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
        a.answer AS answer_text,
        a.is_correct AS is_correct,
        q.score AS score
    FROM question q
    JOIN chess_piece cp ON q.chess_piece_id = cp.id
    JOIN question_type qt ON q.question_type_id = qt.id
    JOIN answer a ON q.id = a.question_id
    ORDER BY q.id, a.id;
    `;
    const questionDetails = await dbQuery(sql);
    const questionsMap = new Map();

    // Format the results
    questionDetails.rows.forEach(row => {
        // Retrieve the values based on key
        const { id, chess_piece_id, chess_piece, question_text, question_type_id, question_type, answer_id, answer_text, is_correct, score } = row;
        // Separate each question
        if (!questionsMap.has(question_text)){
            questionsMap.set(question_text, {
                id,
                chess_piece_id,
                chess_piece,
                question_text,
                question_type_id,
                question_type,
                score,
                answers: []
            });
        }
        // Add answers to answer array of each question
        questionsMap.get(question_text).answers.push({
            id: answer_id,
            answer: answer_text,
            is_correct: is_correct
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
//     "text": "What is python?",
//     "questionTypeId": 1,
//     "chessPieceId": 3,
//     "createBy": "Satou Goro",
//     "updateBy": "Satou Goro",
//     "answers": [
//     {
//         "answer": "Updated answer 1".
//         "isCorrect: 0"
//     },
//     {
//         "id": 35,
//         "answer": "Updated answer 2"
//     },
//     {
//         "id": 36,
//         "answer": "Updated answer 3"
//     },
//     {
//         "id": 37,
//         "answer": "Updated answer 4"
//     }
//     ]

const insertQuestion = async (question) => {
    return transaction(async (connection) => {
        // Insert the question first
        const questionSql = `
            INSERT INTO question
            (text, chess_piece_id, question_type_id, score, create_by, update_by)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        const questionParams = [
            question.text,
            question.chessPieceId,
            question.questionTypeId,
            question.score,
            question.createBy,
            question.updateBy
        ];
        // Destructure to get result and fields, and extract insertId
        const [questionResult] = await connection.query(questionSql, questionParams);
        const questionId = questionResult.insertId;
        
        // Insert associated answers
        const answers = question.answers || [];
        const answerQueries = answers.map(answer => ({
            sql: 'INSERT INTO answer (question_id, answer, is_correct, create_by, update_by) VALUES (?, ?, ?, ?, ?)',
            params: [questionId, answer.answer, answer.isCorrect, question.createBy, question.updateBy]
        }));

        const res = await Promise.all(answerQueries.map(query => connection.query(query.sql, query.params)));
        return res;
    })
}

const updateQuestion = async (question) => {
    // Update the question text
    const questionSql = `
        UPDATE question 
        SET
            text = ?,
            score = ?,
            update_by = ?,
            update_time = ?
        WHERE id = ?;
    `;
    const questionParams = [
        question.text,
        question.score,
        question.updateBy,
        new Date(),
        question.id
    ];
    await dbQuery(questionSql, questionParams);

    // Update existing answers
    const updateAnswerQueries = [];
    const updateAnswerParams = [];

    question.answers.forEach(answer => {
        updateAnswerQueries.push('UPDATE answer SET answer = ?, is_correct = ?, update_by = ?, update_time = ? WHERE id = ?');
        updateAnswerParams.push([answer.answer, answer.isCorrect, question.updateBy, new Date(), answer.id]);
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