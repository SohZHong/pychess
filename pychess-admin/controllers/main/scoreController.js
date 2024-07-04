const ResponseHelper = require('../../models/ResponseHelper');
const { insertScoreTransaction } = require('../../services/main/scoreService');
// Insert Score  
const saveUserScore = async (req, res) => {
    const response = new ResponseHelper(res);
    const { player1, player2 } = req.body
    try {
        const players = [player1.userId, player2.userId];
        const scores = [player1.score, player2.score]
        await insertScoreTransaction(players, scores);
        response.success('Score Inserted Successfully');
    } catch (error) {
        console.error(error);
        response.error('Error saving score');
    }
}

module.exports = { saveUserScore }