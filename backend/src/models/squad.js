const Sequelize = require("sequelize");
const sequelize = require("../util/database");

// TODO: UPDATE TESTS BEFORE MERGING THIS PR!

const Squad = sequelize.define("squad", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  name: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  memberCount: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Squad;
