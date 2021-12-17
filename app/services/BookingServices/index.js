const BookedBikes = require('../../../models/bookedBikes');
const sequelize = require('sequelize');
const User = require('../../../models/users');

async function allBookings(res) {
    let bookings = await BookedBikes.findAll();
    if (bookings) {
        return bookings
    }
    else res.status(401).send({ message: 'No Booking Found' })

}

async function newBooking(data, res) {

    console.log(data);
    let user = await User.findOne({
        where: {
            user_uuid: data.userId
        }
    })

    if (user) {
        var userId = user.user_id;
    }

    let bookings = await BookedBikes.create({
        bike_id: data.bikeId,
        user_id: userId,
        booked_from: data.book_from,
        booked_till: data.book_till,
        total_amount: data.total,
        city: data.city,
        payment_status: data.payment_status
    });
    if (bookings) {
        return bookings
    }
    else res.status(401).send({ message: 'Booking cannot be created' })

}

async function updateBookingData(data, res) {
    console.log(data);
    let bookings = await BookedBikes.update({
        bike_id: data.bikeId,
        user_id: data.userId,
        booked_from: data.booked_from,
        booked_till: data.booked_till,
        total_amount: data.total,
        payment_status: data.payment_status,
    }, {
        where: { booked_bikes_id: data.booked_bikes_id }
    });
    if (bookings) {
        return bookings
    }
    else res.status(401).send({ message: 'Updated' })

}


async function deleteBookingData(data, res) {
    let bookings = await BookedBikes.destroy({
        where: { booked_bikes_id: data }
    });
    if (bookings) {
        return bookings
    }
    else res.status(401).send({ message: 'Cannot be deleted' })

}

async function chartData(res) {

}



module.exports = { allBookings, newBooking, updateBookingData, deleteBookingData, chartData }