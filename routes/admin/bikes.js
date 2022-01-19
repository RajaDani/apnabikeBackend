var express = require("express");
var router = express.Router();
var bike = require("../../app/controller/bikes");
const Authorize = require("../../app/controller/JwtToken/verifyTokens");
var fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "../../public/images/" });

// All Bike Routes

router.get("/", Authorize.verifyAdminToken, bike.getAllBikes);
router.post("/addbike", Authorize.verifyAdminToken, bike.addNewBike);
router.post(
  "/addbike/bikeimage",
  upload.single("image"),
  function (req, res, next) {
    next();
  },
  bike.addBikeImg
);
router.get("/searchbikesincity", bike.searchBikesInCity);
router.get("/searchByInput", Authorize.verifyAdminToken, bike.searchByInput);
router.get("/totalbikes", Authorize.verifyAdminToken, bike.totalBikes);
router.put("/updatebike", Authorize.verifyAdminToken, bike.updateBike);
router.delete(
  "/deletebike/:bikeId",
  Authorize.verifyAdminToken,
  bike.deleteBike
);

module.exports = router;
