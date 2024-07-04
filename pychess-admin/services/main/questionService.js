const { dbMultiQuery } = require('../../utils/dbUtils');

const getQuestions = async () => {
    const queries = [];
    const params = [];
    const sql = `
    WITH RankedQuestions AS (
      SELECT 
        q.id, q.text, q.score, cp.name, q.question_type_id,
        ROW_NUMBER() OVER (PARTITION BY cp.name ORDER BY RAND()) as rn
      FROM question q
      JOIN chess_piece cp ON q.chess_piece_id = cp.id
    )
    SELECT 
      rq.id, rq.text, rq.score, rq.name, rq.question_type_id, a.answer, a.is_correct
    FROM RankedQuestions rq
    JOIN answer a ON a.question_id = rq.id
    WHERE rq.name = ? AND rq.rn <= ?
    ORDER BY rq.id, a.id
    `;
    // Chess Pieces
    const chessPieces = [
     { name: 'pawn', limit: 16 },
     { name: 'king', limit: 2 },
     { name: 'queen', limit: 2 },
     { name: 'knight', limit: 4 },
     { name: 'bishop', limit: 4 },
     { name: 'rook', limit: 4 },
    ];

    chessPieces.forEach(chess => {
        queries.push(sql);
        params.push([chess.name, chess.limit]);
    })

    const questionDetails = await dbMultiQuery(queries, params);
    const questionsMap = new Map();

    questionDetails.forEach(result => {
        // Check if result.rows is defined and is an array
        if (result && result.rows && Array.isArray(result.rows)) {
            result.rows.forEach(row => {
                const { id, text, score, name, question_type_id, answer, is_correct } = row;
                // Separate each question by id
                if (!questionsMap.has(id)){
                    questionsMap.set(id, {
                        id,
                        text,
                        score,
                        name,
                        question_type_id,
                        answers: []
                    });
                }
                // Add answers to answer array of each question
                questionsMap.get(id).answers.push({
                    answer,
                    is_correct: is_correct
                });
            });
        }
    });

    return Array.from(questionsMap.values());
}

module.exports = { getQuestions }