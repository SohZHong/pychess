const ResponseHelper = require('../../models/ResponseHelper');
const { insertScoreTransaction } = require('../../services/main/scoreService');
// Insert Score  
const saveUserScore = async (req, res) => {
    const response = new ResponseHelper(res);
    const { player } = req.body
    try {
        await insertScoreTransaction(player.userId, player.scoreAcquired);
        response.success('Score Inserted Successfully');
    } catch (error) {
        console.error(error);
        response.error('Error saving score');
    }
}

module.exports = { saveUserScore }