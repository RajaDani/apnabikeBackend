const createError = require("http-errors");
const Admin = require("../../../models/admin");
const sequelize = require("../../../models/db");
const User = require("../../../models/users");
const { Op } = require("sequelize");

async function newUser({ value }, res) {
  try {
    let newAddedUser = await User.create({
      firstname: value.firstname,
      lastname: value.lastname,
      username: value.username,
      email: value.email,
      password: value.password,
      mobile: value.mobile,
      cnic: value.cnic,
      passport: value.passport,
    });
    if (newAddedUser) return newAddedUser;
    else {
      res.status(401).send({ message: "User not created" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function allUsers(itemOffset, res) {
  let newoffset = parseInt(itemOffset);

  let users = User.findAndCountAll({
    limit: 8,
    offset: newoffset,
  });
  if (users) return users;
  else res.status(401).send({ message: "Users not found" });
}

async function addNewAdmin({ value }, res) {
  let newAdmin = await Admin.create({
    firstname: value.firstname,
    lastname: value.lastname,
    email: value.email,
    password: value.password,
    role: value.role,
  });

  if (newAdmin) return newAdmin;
  else res.status(401).send({ message: "Error Adding Admin!" });
}

async function verifyAdminFromDatabase(data, res) {
  let admin = await Admin.findOne({
    where: {
      email: data.email,
      password: data.password,
    },
  });

  if (admin) return admin;
  else res.status(404).send({ message: "Admin not found" });
}

async function verifyUserMobile(data, res) {
  try {
    let user = await User.findOne({
      where: {
        mobile: data,
      },
    });

    if (user.user_uuid) return user.user_uuid;
    else throw err;
  } catch (err) {
    res.status(404).send({ message: "User not found" });
  }
}

async function updateUserData(data, res) {
  console.log("data is => ", data);
  let userData = await User.update(
    {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      mobile: data.mobile_no,
      cnic: data.cnic,
      passport: data.passport,
    },
    { where: { user_uuid: data.userId } }
  );

  if (userData) return userData;
  else res.status(401).send({ message: "Not updated" });
}

async function deleteUserData(data, res) {
  let userData = await User.destroy({
    where: { user_id: data },
  });
  if (userData) return userData;
  else res.status(401).send({ message: "cannot be deleted" });
}

async function searchInput(search, res) {
  let searchData = await User.findAll({
    where: {
      [Op.or]: {
        firstname: {
          [Op.like]: "%" + search + "%",
        },
        lastname: {
          [Op.like]: "%" + search + "%",
        },
        username: {
          [Op.like]: "%" + search + "%",
        },
        email: {
          [Op.like]: "%" + search + "%",
        },
        mobile: {
          [Op.like]: "%" + search + "%",
        },
        cnic: {
          [Op.like]: "%" + search + "%",
        },
        passport: {
          [Op.like]: "%" + search + "%",
        },
      },
    },
  });

  if (searchData) {
    return searchData;
  } else res.status(401).send();
}

module.exports = {
  newUser,
  allUsers,
  addNewAdmin,
  verifyAdminFromDatabase,
  updateUserData,
  deleteUserData,
  verifyUserMobile,
  searchInput,
};
