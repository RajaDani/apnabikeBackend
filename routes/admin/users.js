var express = require("express");
var router = express.Router();
var add = require("../../app/controller/user");
const Authorize = require("../../app/controller/JwtToken/verifyTokens");

/* GET users listing. */
router.post("/", Authorize.verifyAdminToken, add.addNewUser);
router.post("/addadmin", Authorize.verifySuperAdminToken, add.addAdmin);
router.post("/verifyadmin", add.verifyAdmin);
router.get("/getallusers", Authorize.verifyAdminToken, add.getAllUsers);
router.get("/searchByInput", Authorize.verifyAdminToken, add.searchByInput);
router.get("/verifyuser/:mobile", Authorize.verifyAdminToken, add.verifyUser);
router.put("/updateuser", Authorize.verifyAdminToken, add.updateUser);
router.delete(
  "/deleteuser/:userId",
  Authorize.verifyAdminToken,
  add.deleteUser
);

module.exports = router;
