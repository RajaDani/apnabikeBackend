const BookedBikes = require("../../../models/bookedBikes");
const sequelize = require("sequelize");
const User = require("../../../models/users");
const Cities = require("../../../models/cities");
const { Op } = require("sequelize");

async function allBookings(itemOffset, res) {
  let newoffset = parseInt(itemOffset);
  let bookings = await BookedBikes.findAndCountAll({
    limit: 8,
    offset: newoffset,
  });
  if (bookings) {
    return bookings;
  } else res.status(401).send({ message: "No Booking Found" });
}

async function newBooking(data, res) {
  let user = await User.findOne({
    where: {
      user_uuid: data.userId,
    },
  });

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
    payment_status: data.payment_status,
    bike_delivery: data.deliveryMethod,
    longitude: data.longitude,
    latitude: data.latitude,
  });
  if (bookings) {
    return bookings;
  } else res.status(401).send({ message: "Booking cannot be created" });
}

async function updateBookingData(data, res) {
  console.log(data);
  let bookings = await BookedBikes.update(
    {
      booked_from: data.booked_from,
      booked_till: data.booked_till,
      total_amount: data.total,
      payment_status: data.payment_status,
    },
    {
      where: { booked_bikes_id: data.booked_bikes_id },
    }
  );
  if (bookings) {
    return bookings;
  } else res.status(401).send({ message: "Updated" });
}

async function deleteBookingData(data, res) {
  let bookings = await BookedBikes.destroy({
    where: { booked_bikes_id: data },
  });
  if (bookings) {
    return bookings;
  } else res.status(401).send({ message: "Cannot be deleted" });
}

async function searchInput(search, res) {
  let searchData = await BookedBikes.findAll({
    where: {
      [Op.or]: {
        city: {
          [Op.like]: "%" + search + "%",
        },
        booked_from: {
          [Op.like]: "%" + search + "%",
        },
        booked_till: {
          [Op.like]: "%" + search + "%",
        },
        payment_status: {
          [Op.like]: "%" + search + "%",
        },
        total_amount: {
          [Op.like]: "%" + search + "%",
        },
      },
    },
  });

  if (searchData) {
    return searchData;
  } else res.status(401).send();
}

module.exports = {
  allBookings,
  newBooking,
  updateBookingData,
  deleteBookingData,
  searchInput,
};
