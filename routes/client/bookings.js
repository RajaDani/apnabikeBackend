var express = require("express");
var router = express.Router();
var bookings = require("../../app/controller/bookings");
const Authorize = require("../../app/controller/JwtToken/verifyTokens");

router.post("/addbooking", Authorize.verifyUserToken, bookings.addNewBooking);

module.exports = router;
