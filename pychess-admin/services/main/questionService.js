const { dbMultiQuery } = require('../../utils/dbUtils');

const getQuestions = async () => {
    const queries = [];
    const params = [];
    const sql = `
    SELECT q.id, q.text, q.score, cp.name, cp.question_type_id, a.answer, a.is_correct 
    FROM question q
    JOIN chess_piece cp ON q.chess_piece_id = cp.id
    JOIN answer a ON a.question_id = q.id
    WHERE cp.name = ?
    ORDER BY RAND()
    LIMIT ?;
    `
    // Get Pawn Questions
    queries.push(sql);
    params.push(['pawn', 16]);
    // Get King Questions
    queries.push(sql);
    params.push(['king', 2]);
    // Get Queen Questions
    queries.push(sql);
    params.push(['queen', 2]);
    // Get Knight Questions
    queries.push(sql);
    params.push(['knight', 4]);
    // Get Bishop Questions
    queries.push(sql);
    params.push(['bishop', 4]);
    // Get Rook Questions
    queries.push(sql);
    params.push(['rook', 4]);

    const questionDetails = await dbMultiQuery(queries, params);
    const questionsMap = new Map();

    questionDetails.forEach(result => {
        // Check if result.rows is defined and is an array
        if (result && result.rows && Array.isArray(result.rows)) {
            result.rows.forEach(row => {
                const { id, text, score, name, question_type_id, answer, is_correct } = row;
                // Separate each question
                if (!questionsMap.has(text)){
                    questionsMap.set(text, {
                        id,
                        text,
                        score,
                        name,
                        question_type_id,
                        answers: []
                    });
                }
                // Add answers to answer array of each question
                questionsMap.get(text).answers.push({
                    answer,
                    is_correct: is_correct
                });
            });
        }
    });

    return Array.from(questionsMap.values());
}

module.exports = { getQuestions }