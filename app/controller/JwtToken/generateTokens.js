const jwt = require('jsonwebtoken');
const config = require('config')

async function adminToken(data, res) {
    let token = jwt.sign(
        { adminId: data.admin_uuid, firstname: data.firstname },
        config.get("JwtSecret"),
        {
            expiresIn: '7 day'
        }
    );
    if (token) {
        let adminName = data.firstname;
        let result = { token, adminName }
        res.status(200).send({ result, message: 'Verified Admin' });
    }
    else res.status(401).send({ message: 'Error Creating Token' })

}

async function userToken(data, res) {
    let token = jwt.sign(
        { userId: data.user_uuid, userName: data.username, email: data.email },
        config.get("JwtSecret"),
        {
            expiresIn: '7 day'
        }
    );
    if (token) {
        let username = data.username;
        let userId = data.user_uuid;
        let result = { username, token, userId }
        res.status(200).send(result);
    }
    else res.status(401).send({ message: 'Error Creating Token' })
}

module.exports = { adminToken, userToken }