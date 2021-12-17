var Sequelize = require('sequelize');
var sequelize = require('./db');
const BookedBikes = require('./bookedBikes');
var Rent = require('./rent');

const Bike = sequelize.define('Bike', {
    bike_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    bike_uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false
    },
    company: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false
    },
    model: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    chasis_no: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_city: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false
    }
})

Bike.hasOne(Rent, { foreignKey: 'bike_id', foreignKeyConstraint: true });
Bike.hasOne(BookedBikes, { foreignKey: 'bike_id', foreignKeyConstraint: true });

module.exports = Bike;