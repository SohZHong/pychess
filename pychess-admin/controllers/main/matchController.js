const ResponseHelper = require('../../models/ResponseHelper');
const { listUserMatchHistory, insertMatchHistory } = require('../../services/main/matchService');
const { getQuestions } = require('../../services/main/questionService');
const { generateQRCodes } = require('../../utils/qrUtils');
// Start A Match
const startMatch = async (req, res) => {
    const response = new ResponseHelper(res);
    try {
        const questions = await getQuestions();
        const qrCodes = await generateQRCodes(questions)
        response.success('Questions Retrieved Successfully', qrCodes);
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

// Save Match
const saveMatch = async (req, res) => {
    const response = new ResponseHelper(res);
    try {
        const { winner, loser } = req.body;
        await insertMatchHistory(winner, loser);
        response.success('Match Saved Successfully');
    } catch (error) {
        console.error(error);
        response.error('Error saving match');
    }
}

module.exports = { startMatch, getUserMatchHistory, saveMatch }