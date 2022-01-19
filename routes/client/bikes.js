var express = require("express");
var router = express.Router();
var bike = require("../../app/controller/bikes");
const Authorize = require("../../app/controller/JwtToken/verifyTokens");
var str = require("../../app/controller/stripe");

router.get("/", bike.getAllBikesClient);
router.get("/searchbikes", bike.searchAvailableBikes);
router.get("/getbike/:bikeId", Authorize.verifyUserToken, bike.getBike);
router.post("/create-payment-intent", str.paymentIntent);

module.exports = router;
