var sequelize = require('./db');
var Sequelize = require('sequelize');

const BookedBikes = sequelize.define('BookedBikes', {
    booked_bikes_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    bike_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    booked_from: {
        type: Sequelize.DATE,
        allowNull: false
    },
    booked_till: {
        type: Sequelize.DATE,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    total_amount: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    payment_status: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = BookedBikes;