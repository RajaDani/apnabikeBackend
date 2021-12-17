var express = require('express');
var router = express.Router();
var bookings = require('../../app/controller/bookings');
const Authorize = require('../../app/controller/JwtToken/verifyTokens');

router.get('/', Authorize.verifyAdminToken, bookings.getAllBookings);
// router.post('/addbooking', Authorize.verifyUserToken, bookings.addNewBooking);
router.post('/addbooking', Authorize.verifyAdminToken, bookings.addNewBooking);
router.put('/updatebooking', Authorize.verifyAdminToken, bookings.updatebooking);
router.delete('/deletebooking/:bookingId', Authorize.verifyAdminToken, bookings.deleteBooking);

module.exports = router;
