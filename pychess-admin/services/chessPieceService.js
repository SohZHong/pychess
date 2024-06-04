const { dbQuery } = require('../utils/dbUtils');

const listAllChessPiece = async () => {
    const sql = `SELECT * FROM chess_piece`;
    const chessPieces = await dbQuery(sql);
    return chessPieces.rows;
}

const insertChessPiece = async (chess) => {
    const sql = `
    INSERT INTO chess_piece
    (name, question_type_id, create_by, update_by)
    VALUES
    (?, ?, ?, ?)
    `
    const params = [
        chess.name,
        chess.questionTypeId,
        chess.createBy,
        chess.updateBy
    ]
    const query = await dbQuery(sql, params);
    return query.rows;
}

const updateChessPiece = async (chess) => {
    const sql = `
    UPDATE chess_piece
    SET
    question_type_id = ?,
    update_by = ?,
    update_time = ?
    WHERE id = ?;
    `;
    const params = [
        chess.questionTypeId,
        chess.updateBy,
        new Date(chess.updateTime),
        chess.id
    ];
    const query = await dbQuery(sql, params);
    return query.rows;
}

const deleteChessPiece = async (chessIds) => {
    // Convert single ID to array for consistent processing
    const params = Array.isArray(chessIds) ? chessIds : [chessIds];
    // Step 3: Delete questions
    const sql = `
        DELETE FROM chess_piece
        WHERE id IN (?);
    `;
    const query = dbQuery(sql, params);
    return query.rows;
}

module.exports = { listAllChessPiece, insertChessPiece, updateChessPiece, deleteChessPiece }