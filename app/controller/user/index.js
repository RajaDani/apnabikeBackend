const sequelize = require('../../../models/db');
const User = require('../../../models/users');
const jwt = require('jsonwebtoken');
const config = require('config')
const createError = require('http-errors')
const { validateNewUser, validateAdmin } = require('../../validators/User');
const { newUser, allUsers, addNewAdmin, verifyAdminFromDatabase, updateUserData,
    deleteUserData, verifyUserMobile } = require('../../services/userServices');
const Admin = require('../../../models/admin');

const addNewUser = async (req, res) => {

    try {
        let data = await validateNewUser(req.body, res);
        if (data) {
            let newuser = await newUser(data, res);
            if (newuser) {
                let token = jwt.sign(
                    { userId: newuser.user_id, userName: newuser.username },
                    config.get("JwtSecret"),
                    {
                        expiresIn: '7 day'
                    }
                );
                console.log('token', token)
                let username = newuser.username;
                let result = { username, token }
                res.status(200).send(result);
            }
        }

    } catch (err) {
        console.log(err);
    }
}

const authenticateUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        let user = await User.findOne({
            where: {
                email: email,
                password: password
            }
        });

        if (user) {
            let token = jwt.sign(
                { userId: user.user_id, userName: user.username, email: user.email },
                config.get("JwtSecret"),
                {
                    expiresIn: '7 day'
                }
            );
            let username = user.username;
            let result = { username, token }
            res.send(result);
        }
        else {
            var err = createError(401);
            res.send(err);
        }
    }

    catch (error) {
        console.log(error);
    }
}

async function verifyToken(req, res) {
    let authHeader = req.headers.authorization;
    let token = authHeader.split(' ')[1];

    jwt.verify(token, config.get("JwtSecret"), function (err, result) {
        if (err) {
            let tokenError = createError(401);
            res.status(401).send();
        }
        else {
            return;
            res.status(200).send({ userId: result.userId, email: result.email, username: result.userName });
        }
    })
}


async function getAllUsers(req, res) {
    try {
        let users = await allUsers();
        if (users) {
            res.send(users);
        }
    } catch (error) {
        console.log(error);
    }
}


async function verifyAdmin(req, res) {
    try {
        console.log(req.body);
        let admin = await verifyAdminFromDatabase(req.body, res);
        if (admin) {
            let token = jwt.sign(
                { adminId: admin.admin_id, name: admin.firstname },
                config.get('JwtSecret'),
                {
                    expiresIn: '7days'
                }
            );

            let adminName = admin.firstname;
            let result = { token, adminName };
            res.send({ result, message: 'Verified Admin' });
        }
        else res.status(400).send({ message: 'Admin not found' })
    } catch (error) {
        console.log(error);
    }
}

async function addAdmin(req, res) {
    try {

        console.log(req.body);

        let validatedData = await validateAdmin(req.body, res);
        if (validatedData) {
            let newAdmin = await addNewAdmin(validatedData, res);
            let token = jwt.sign(
                { adminId: newAdmin.admin_id, firstname: newAdmin.firstname, email: newAdmin.email },
                config.get("JwtSecret"),
                {
                    expiresIn: '7 day'
                }
            );
            console.log(token);
            let adminName = newAdmin.firstname;
            let result = { token, adminName }
            console.log(result);
            res.status(200).send(result);
        }
        else res.status(401).send({ message: 'Error Adding Admin!' });

    } catch (error) {
        console.log(error);
    }
}

async function verifyUser(req, res) {
    let mobile = req.params.mobile;
    console.log(mobile);
    let user = await verifyUserMobile(mobile, res);
    if (user) res.status(200).send({ message: 'User verified' })
    else res.status(404).send({ message: 'Not found' })
}

async function updateUser(req, res) {

    let updated = await updateUserData(req.body, res)
    if (updated) res.status(200).send({ message: 'Updated' });
    else res.status(401).send({ message: 'cannot be updated' });

}

async function deleteUser(req, res) {

    var userId = req.params.userId;
    let validatedData = await deleteUserData(userId, res)
    if (validatedData) res.status(200).send({ message: 'Deleted' });
    else res.status(401).send({ message: 'cannot be deleted' });

}

module.exports = {
    addNewUser,
    authenticateUser,
    verifyToken,
    getAllUsers,
    addAdmin,
    verifyAdmin,
    updateUser,
    deleteUser,
    verifyUser
}