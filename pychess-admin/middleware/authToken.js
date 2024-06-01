const ResponseHelper = require('../models/ResponseHelper')
const { verifyToken } = require('../utils/tokenUtils');

const checkTokenMiddleware = (req, res, next) => {
    const token = req.cookies['Token']; // Read token from cookie
    const response = new ResponseHelper(res);
    if (token) {
        const decoded = verifyToken(token)
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            response.unauthorize('Failed to authenticate token, please login');
        }
    } else {
        response.unauthorize();
    };
}

module.exports = checkTokenMiddleware;