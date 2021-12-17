var express = require('express');
var router = express.Router();
var rent = require('../../app/controller/rent');
const Authorize = require('../../app/controller/JwtToken/verifyTokens');


router.get('/addrent', Authorize.verifyAdminToken, rent.addRent);
router.get('/', Authorize.verifyAdminToken, rent.getRent);

module.exports = router;