var sequelize = require('./db');
var Sequelize = require('sequelize');
var BookedBikes = require('./bookedBikes');

const User = sequelize.define('User', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  user_uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  firstname: {
    allowNull: false,
    type: Sequelize.STRING
  },
  lastname: {
    allowNull: false,
    type: Sequelize.STRING
  },
  username: {
    allowNull: false,
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cnic: {
    type: Sequelize.BIGINT(13),
    allowNull: false
  },
  mobile: {
    type: Sequelize.BIGINT(11),
    allowNull: false
  },
  passport: {
    type: Sequelize.BIGINT(13),
    allowNull: true
  }

});

User.hasOne(BookedBikes, { foreignKey: 'user_id', foreignKeyConstraint: true })

module.exports = User;