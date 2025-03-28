const sequelize = require("../../../models/db");
const { QueryTypes } = require("sequelize");
const Bike = require("../../../models/bikes");
const User = require("../../../models/users");
const Booked = require("../../../models/bookedBikes");

async function chartData(res) {
  let chart = await sequelize.query(
    "SELECT sum(bookedbikes.total_amount)  as total , monthname(bookedbikes.booked_from) as monthly , year(bookedbikes.booked_from) as yearly from apnabike.bookedbikes group by month(bookedbikes.booked_from) , year(bookedbikes.booked_from) order by booked_from",
    {
      type: QueryTypes.SELECT,
    }
  );

  if (chart) return chart;
  else res.status(401).send({ message: "Bad Request" });
}

async function dashboardData(res) {
  sequelize.sync()
  let bike = await Bike.count();
  let orders = await Booked.count();
  let users = await User.count();

  if (bike && orders && users) return { bike, orders, users };
  else res.status(401).send();
}

async function latestTransactions(res) {
  let transactions = await Booked.findAll({ limit: 7 });
  if (transactions) return transactions;
}

async function mapCoordinates(res) {
  let coordinates = await Booked.findAll({
    where: {
      bike_delivery: "Drop at location",
    },
  });
  if (coordinates) return coordinates;
}

module.exports = {
  chartData,
  dashboardData,
  latestTransactions,
  mapCoordinates,
};
