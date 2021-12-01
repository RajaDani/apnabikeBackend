var express = require('express');
var router = express.Router();
var bookings = require('../app/controller/bookings');

router.get('/', bookings.getAllBookings);
router.post('/addbooking', bookings.addNewBooking);
router.put('/updatebooking', bookings.updatebooking);
router.delete('/deletebooking/:bookingId', bookings.deleteBooking);

module.exports = router;
