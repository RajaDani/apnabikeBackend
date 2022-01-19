const {
  allBookings,
  newBooking,
  updateBookingData,
  deleteBookingData,
  searchInput,
} = require("../../services/BookingServices");

async function getAllBookings(req, res) {
  let bookings = await allBookings(req.query.offset, res);
  if (bookings) res.send(bookings);
  else res.status(401).send({ message: "No Booking Found" });
}

async function addNewBooking(req, res) {
  console.log("data is :", req.body);
  let bookings = await newBooking(req.body);
  if (bookings) res.send(bookings);
  else res.status(401).send({ message: "Booking cannot be added" });
}

async function updatebooking(req, res) {
  let updatedBooking = await updateBookingData(req.body, res);
  if (updatedBooking) res.status(200).send({ message: "Updated" });
  else res.status(401).send({ message: "Cannot be updated" });
}

async function deleteBooking(req, res) {
  let bookingId = req.params.bookingId;

  let updatedBooking = await deleteBookingData(bookingId, res);
  if (updatedBooking) res.status(200).send({ message: "Deleted" });
  else res.status(401).send({ message: "Cannot be deleted" });
}

async function searchByInput(req, res) {
  let search = req.query.search;
  let searchData = await searchInput(search, res);
  if (searchData) {
    res.status(200).send(searchData);
  }
}

module.exports = {
  getAllBookings,
  addNewBooking,
  updatebooking,
  deleteBooking,
  searchByInput,
};
