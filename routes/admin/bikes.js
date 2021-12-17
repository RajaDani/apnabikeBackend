var express = require('express');
var router = express.Router();
var bike = require('../../app/controller/bikes');
const Authorize = require('../../app/controller/JwtToken/verifyTokens');

router.get('/', Authorize.verifyAdminToken, bike.getAllBikes);
router.post('/addbike', Authorize.verifyAdminToken, bike.addNewBike);
// router.get('/searchbikes', bike.searchAvailableBikes);
router.get('/searchbikesincity', Authorize.verifyAdminToken, bike.searchBikesInCity);
// router.get('/getbike/:bikeId', Authorize.verifyUserToken, bike.getBike);
router.get('/totalbikes', Authorize.verifyAdminToken, bike.totalBikes);
router.put('/updatebike', Authorize.verifyAdminToken, bike.updateBike);
router.delete('/deletebike/:bikeId', Authorize.verifyAdminToken, bike.deleteBike);

module.exports = router;