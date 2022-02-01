const express = require("express");
const router = express.Router();
const dashboard = require("../../app/controller/dashboard");
const Authorize = require("../../app/controller/JwtToken/verifyTokens");

router.get("/", dashboard.getChartData);
router.get(
  "/getAllDashboardData",
  Authorize.verifyAdminToken,
  dashboard.getAllDashboardData
);
router.get(
  "/getLatestTransactions",
  Authorize.verifyAdminToken,
  dashboard.getLatestTransactions
);
router.get(
  "/getMapCoordinates",
  Authorize.verifyAdminToken,
  dashboard.getMapCoordinates
);

module.exports = router;
