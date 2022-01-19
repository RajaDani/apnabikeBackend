const sequelize = require("../../../models/db");
const User = require("../../../models/users");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validateNewUser, validateAdmin } = require("../../validators/User");
const {
  newUser,
  allUsers,
  addNewAdmin,
  verifyAdminFromDatabase,
  updateUserData,
  deleteUserData,
  verifyUserMobile,
  searchInput,
} = require("../../services/userServices");
const Admin = require("../../../models/admin");
const { adminToken, userToken } = require("../JwtToken/generateTokens");
const {
  verifyAdminToken,
  verifyUserToken,
} = require("../JwtToken/verifyTokens");

const addNewUser = async (req, res) => {
  try {
    let data = await validateNewUser(req.body, res);
    if (data) {
      let newuser = await newUser(data, res);
      if (newuser) {
        userToken(newuser, res);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    if (user) {
      userToken(user, res);
    } else {
      res.status(404).send({ message: "User not found!" });
    }
  } catch (error) {
    console.log(error);
  }
};

async function verifyToken(req, res) {
  try {
    let result = await verifyUserToken(req, res);
    if (result) {
      res.status(200).send({
        userId: result.userId,
        email: result.email,
        username: result.userName,
        message: "Token verified",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function getAllUsers(req, res) {
  try {
    let users = await allUsers(req.query.offset, res);
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
      adminToken(admin, res);
    } else res.status(404).send({ message: "Admin not found" });
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
      if (newAdmin) {
        adminToken(newAdmin, res);
      }
    } else res.status(401).send({ message: "Error Adding Admin!" });
  } catch (error) {
    console.log(error);
  }
}

async function verifyUser(req, res) {
  let mobile = req.params.mobile;
  let user = await verifyUserMobile(mobile, res);
  if (user) res.status(200).send({ user, message: "User verified" });
  else res.status(404).send({ message: "Not found" });
}

async function updateUser(req, res) {
  let updated = await updateUserData(req.body, res);
  if (updated) res.status(200).send({ message: "Updated" });
  else res.status(401).send({ message: "cannot be updated" });
}

async function deleteUser(req, res) {
  var userId = req.params.userId;
  let validatedData = await deleteUserData(userId, res);
  if (validatedData) res.status(200).send({ message: "Deleted" });
  else res.status(401).send({ message: "cannot be deleted" });
}

async function searchByInput(req, res) {
  let search = req.query.search;
  let searchData = await searchInput(search, res);
  if (searchData) {
    res.status(200).send(searchData);
  }
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
  verifyUser,
  searchByInput,
};
