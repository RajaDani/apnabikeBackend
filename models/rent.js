var sequelize = require('./db');
var Sequelize = require('sequelize');
var Bike = require('./bikes');

const Rent = sequelize.define('Rent', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    daily_rent: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    weekly_rent: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    monthly_rent: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bike_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

module.exports = Rent;