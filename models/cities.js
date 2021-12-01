var sequelize = require('./db');
var Sequelize = require('sequelize');
var Bike = require('./bikes');

const Cities = sequelize.define('Cities', {
    id_city: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    city_name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

Cities.hasOne(Bike, { foreignKey: 'id_city', foreignKeyConstraint: true });

module.exports = Cities;