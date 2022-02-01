const express = require("express");
const router = express.Router();
const dashboard = require("../../app/controller/dashboard/userDashboard");
const Authorize = require("../../app/controller/JwtToken/verifyTokens");

router.get("/", Authorize.verifyUserToken, dashboard.getUserDashboardData);
router.get(
  "/getLatestTransactions",
  Authorize.verifyUserToken,
  dashboard.getUserLatestTransactions
);
router.get(
  "/getbookings",
  Authorize.verifyUserToken,
  dashboard.getUserBookings
);

module.exports = router;
