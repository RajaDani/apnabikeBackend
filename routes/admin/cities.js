var express = require('express');
var router = express.Router();
var city = require('../../app/controller/cities');

router.get('/', city.addCity);
router.get('/getcities', city.getCities);

module.exports = router;
