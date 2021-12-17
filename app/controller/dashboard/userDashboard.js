const { userDashboardData, userLatestTransactions } = require('../../services/Dashboard/userDashboard');

async function getUserDashboardData(req, res) {
    let data = await userDashboardData(req.query, res);
    if (data) {
        res.status(200).send(data)
    }
    else res.status(401).send({ message: 'Error while getting Data' });
}

async function getUserLatestTransactions(req, res) {
    let data = await userLatestTransactions(req.query, res);
    if (data) {
        res.status(200).send(data)
    }
    else res.status(401).send({ message: 'Error while getting Bookings' });
}

async function getUserBookings(req, res) {
    let data = await userBookings(req.query, res);
    if (data) {
        res.status(200).send(data)
    }
    else res.status(401).send({ message: 'Error while getting Bookings' });
}

module.exports = { getUserDashboardData, getUserLatestTransactions, getUserBookings }
