let Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
  }
);

const models = {
  User: sequelize.import("./user"),
};

// Associate foreign keys
Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = { models, sequelize };
