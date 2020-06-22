let Sequelize = require("sequelize");

const database = process.env.NODE_ENV === 'development'
  ? process.env.DATABASE
  : process.env.DATABASE_TEST;

const sequelize = new Sequelize(
  database,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    logging: false,   // Set to true if you want sequelize logs
  }
);

module.exports = sequelize;