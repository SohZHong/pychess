const ResponseHelper = require('../../models/ResponseHelper');
const { listUserMatchHistory } = require('../../services/main/matchService');
const { getQuestions } = require('../../services/main/questionService');
// Start A Match
const startMatch = async (req, res) => {
    const response = new ResponseHelper(res);
    try {
        const questions = await getQuestions();
        response.success('Questions Retrieved Successfully', questions);
    } catch (error) {
        console.error(error);
        response.error('Error retrieving questions');
    }
}

// Get Match History
const getUserMatchHistory = async (req, res) => {
    const response = new ResponseHelper(res);
    try {
        const userId = req.user.id;
        const history = await listUserMatchHistory(userId);
        response.success('Match History Retrieved Successfully', history);
    } catch (error) {
        console.error(error);
        response.error('Error retrieving match history');
    }
};

module.exports = { startMatch, getUserMatchHistory }