const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const SquadMember = sequelize.define("squadMember", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = SquadMember;
