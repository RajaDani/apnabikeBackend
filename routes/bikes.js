var express = require('express');
var router = express.Router();
var bike = require('../app/controller/bikes');

router.get('/', bike.getAllBikes);
router.post('/addbike', bike.addNewBike);
router.get('/bookBike', bike.bookBike);
router.get('/searchbikes', bike.searchAvailableBikes);
router.get('/searchbikesincity', bike.searchBikesInCity);
router.get('/getbike/:bikeId', bike.getBike);
router.get('/totalbikes', bike.totalBikes);
router.put('/updatebike', bike.updateBike);
router.delete('/deletebike/:bikeId', bike.deleteBike);

module.exports = router;