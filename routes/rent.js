var express = require('express');
var router = express.Router();
var rent = require('../app/controller/rent');

router.get('/addrent', rent.addRent);
router.get('/', rent.getRent);

module.exports = router;