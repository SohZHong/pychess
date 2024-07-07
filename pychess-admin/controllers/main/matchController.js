const ResponseHelper = require('../../models/ResponseHelper');
const { listUserMatchHistory, insertMatchHistory } = require('../../services/main/matchService');
const { getQuestions } = require('../../services/main/questionService');
const { generateQRCode } = require('../../utils/qrUtils');
// Start A Match
const startMatch = async (req, res) => {
    const response = new ResponseHelper(res);
    try {
        const questions = await getQuestions();
        const blackQuestions = questions.filter(q => q.side === 'black');
        const whiteQuestions = questions.filter(q => q.side === 'white');
        // Generate Black QR
        const blackQRCodes = await Promise.all(
            blackQuestions.map(async (question) => {
                const qrCode = await generateQRCode(question);
                return {
                    id: question.id,
                    name: question.name,
                    code: qrCode
                };
            })
        );
        // Generate White QR
        const whiteQRCodes = await Promise.all(
            whiteQuestions.map(async (question) => {
                const qrCode = await generateQRCode(question);
                return {
                    id: question.id,
                    name: question.name,
                    code: qrCode
                };
            })
        );
        response.success('Questions Retrieved Successfully', { blackQRCodes, whiteQRCodes });
    } catch (error) {
        console.error(error);
        response.error('Error retrieving questions');
    }
};

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
const saveMatchHistory = async (req, res) => {
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

module.exports = { startMatch, getUserMatchHistory, saveMatchHistory }