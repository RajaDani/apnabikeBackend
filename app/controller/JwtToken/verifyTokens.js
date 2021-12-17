const jwt = require('jsonwebtoken');
const config = require('config');

async function verifyUserToken(data, res, next) {
    try {
        let authHeader = data.headers.authorization;
        let token = authHeader.split(' ')[1];

        jwt.verify(token, config.get("JwtSecret"), function (err, result) {
            if (result.userId) next();
            else throw err;
        })
    }
    catch (error) {
        res.status(401).send({ message: 'Your session is expired. Login Again' })
    }
}

async function verifyAdminToken(req, res, next) {
    try {
        let authHeader = req.headers.authorization;
        let token = authHeader.split(' ')[1];

        jwt.verify(token, config.get("JwtSecret"), function (err, result) {
            if (result.adminId) next();
            else throw err;
        })
    }
    catch (error) {
        res.status(401).send({ message: 'Your session is expired. Login Again' })
    }
}

module.exports = { verifyUserToken, verifyAdminToken }