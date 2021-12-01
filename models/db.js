const Sequelize = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(config.get("dbConfig"));

module.exports = sequelize;
