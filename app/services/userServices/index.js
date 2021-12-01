const createError = require('http-errors');
const Admin = require('../../../models/admin');
const sequelize = require('../../../models/db');
const User = require('../../../models/users');

async function newUser({ value }, res) {
    try {

        console.log(value);
        let newAddedUser = await User.create({
            firstname: value.firstname,
            lastname: value.lastname,
            username: value.username,
            email: value.email,
            password: value.password,
            mobile: value.mobile,
            cnic: value.cnic,
            passport: value.passport,
        })
        if (newAddedUser) return newAddedUser;
        else {
            res.status(401).send({ message: 'User not created' })
        }

    } catch (error) {
        console.log(error);
    }

}

async function allUsers() {
    let users = User.findAll();
    if (users) return users;
}

async function addNewAdmin({ value }, res) {

    let newAdmin = await Admin.create({
        firstname: value.firstname,
        lastname: value.lastname,
        email: value.email,
        password: value.password
    });

    if (newAdmin) return newAdmin;
    else res.status(401).send({ message: 'Error Adding Admin!' });

}

async function verifyAdminFromDatabase(data, res) {

    let admin = await Admin.findOne({
        where: {
            email: data.email,
            password: data.password
        }
    });

    if (admin) return (admin);
    else res.status(404).send({ message: 'Admin not found' })
}

async function verifyUserMobile(data, res) {

    let user = await User.findOne({
        where: {
            mobile: data
        }
    });

    if (user) return (user);
    else res.status(404).send({ message: 'User not found' })
}


async function updateUserData(data, res) {
    let userData = await User.update({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        mobile: data.mobile_no,
        cnic: data.cnic,
        passport: data.passport
    }, { where: { user_id: data.userId } })

    if (userData) return userData;
    else res.status(401).send({ message: 'Not updated' })
}


async function deleteUserData(data, res) {
    let userData = await User.destroy({
        where: { user_id: data }
    })
    if (userData) return userData;
    else res.status(401).send({ message: 'cannot be deleted' })
}

module.exports = {
    newUser,
    allUsers,
    addNewAdmin,
    verifyAdminFromDatabase,
    updateUserData,
    deleteUserData,
    verifyUserMobile
}