let Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
  }
);

const models = {
  User: sequelize.import("./user"),
  Auth: sequelize.import("./auth"),
};

// Add foreign key to auth
models.Auth.belongsTo(models.User);

// Associate foreign keys
Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = { models, sequelize };
