const ResponseHelper = require('../../models/ResponseHelper');
const { getLeaderboardStatistics } = require('../../services/main/leaderboardService');

// Fetch API Key
const getLeaderboard = async(req, res) => {
    const userId = req.user.id;
    const response = new ResponseHelper(res);
    const statistics = await getLeaderboardStatistics(userId);
    if (statistics) {
        response.success('Leaderboard Retrieved Successfully', statistics);
    } else {
        response.error('Error retrieving leaderboard');
    };
};

module.exports = { getLeaderboard }