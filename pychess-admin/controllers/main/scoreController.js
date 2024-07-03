const ResponseHelper = require('../../models/ResponseHelper');
const { insertScoreTransaction } = require('../../services/main/scoreService');
// Insert Score  
const saveUserScore = async (req, res) => {
    const response = new ResponseHelper(res);
    const { player1, player2 } = response.data
    try {
        await insertScoreTransaction(player1.userId, player1.score);
        await insertScoreTransaction(player2.userId, player2.score);
        response.success('Score Inserted Successfully');
    } catch (error) {
        console.error(error);
        response.error('Error saving score');
    }
}

module.exports = { saveUserScore }