const sequelize = require("../../../models/db");
const Bike = require("../../../models/bikes");
const User = require("../../../models/users");
const Booked = require("../../../models/bookedBikes");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

async function userDashboardData(data, res) {
  let user = await User.findOne({
    where: {
      user_uuid: data.userId,
    },
  });
  if (user) var userId = user.user_id;

  let totalorders = await Booked.count({
    where: {
      user_id: userId,
    },
  });

  let cancelledOrders = await Booked.count({
    where: {
      [Op.and]: { user_id: userId, payment_status: "Cancelled" },
    },
  });

  let date = new Date();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let thisMonth = await sequelize.query(
    "SELECT count(*) as total from bookedbikes where month(booked_till)= " +
      month +
      " and year(booked_till) = " +
      year +
      " and user_id = " +
      userId +
      "",
    {
      type: QueryTypes.SELECT,
    }
  );

  if (totalorders || cancelledOrders || thisMonth)
    return { totalorders, cancelledOrders, thisMonth };
  else res.status(401).send();
}

async function userLatestTransactions(data, res) {
  let user = await User.findOne({
    where: {
      user_uuid: data.userId,
    },
  });
  if (user) var userId = user.user_id;

  let transactions = await Booked.findAll({
    where: {
      user_id: userId,
    },
    limit: 5,
  });
  if (transactions) return transactions;
}

async function userBookings(data, res) {
  let user = await User.findOne({
    where: {
      user_uuid: data.userId,
    },
  });
  if (user) {
    console.log("user : ", user);
    var userId = user.user_id;
  }

  let transactions = await Booked.findAll({
    where: {
      user_id: userId,
    },
  });
  if (transactions) return transactions;
}

module.exports = { userDashboardData, userLatestTransactions, userBookings };
