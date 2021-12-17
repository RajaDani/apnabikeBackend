const { QueryTypes } = require('sequelize');
const { chartData, dashboardData, latestTransactions } = require('../../services/Dashboard');

async function getChartData(req, res) {
    let data = await chartData(res);
    if (data) {
        res.status(200).send(data)
    }
    else res.status(401).send();
}

async function getAllDashboardData(req, res) {
    let data = await dashboardData(res);
    if (data) {
        res.status(200).send(data)
    }
    else res.status(401).send();
}

async function getLatestTransactions(req, res) {
    let data = await latestTransactions(res);
    if (data) {
        res.status(200).send(data)
    }
    else res.status(401).send();
}


module.exports = { getChartData, getAllDashboardData, getLatestTransactions }