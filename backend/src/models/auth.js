const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Auth = sequelize.define("auth", {
  hash: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  salt: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Auth;
