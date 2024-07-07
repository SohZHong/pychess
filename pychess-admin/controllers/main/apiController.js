const ResponseHelper = require('../../models/ResponseHelper');

// Fetch API Key
const getApiKey = async(req, res) => {
    const response = new ResponseHelper(res);
    const secretKey = process.env.AES_SECRET;
    if (secretKey) {
        response.success('Api Key Retrieved Successfully', secretKey);
    } else {
        response.error('No Api Key Found');
    };
};

module.exports = { getApiKey }