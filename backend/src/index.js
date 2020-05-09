require("dotenv/config");
var express = require("express");
var routes = require("./routes");
var { models, sequelize } = require("./models");

const app = express();
const eraseDatabaseOnStart = false; // db cleared and repopulated on start

//// Middleware ////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add app context to each request
app.use(async (req, res, next) => {
  req.context = { models };
  next();
});

//// Routes ////
app.use("/users", routes.user);

sequelize.sync({ force: eraseDatabaseOnStart }).then(() => {
  if (eraseDatabaseOnStart) {
    console.log("Database erased. Repopulating...");
    createSampleUsers();
    setTimeout(() => console.log("Database database populated."), 1000);
  }
  app.listen(process.env.PORT, () => {
    console.log(`frontend is listening on port ${process.env.PORT}`);
  });
});

// Populate database functions
const createSampleUsers = async () => {
  await models.User.create({
    firstName: "Postman",
    lastName: "Pat",
    email: "pat@royal-mail.co.uk",
    aspirationalMessage: "Post man Pat and his black and white cat",
  });
  await models.User.create({
    firstName: "Fireman",
    lastName: "Sam",
    email: "sam@firestation.com",
    aspirationalMessage: "He's always on the scene, Fireman Sam!",
  });
};

module.exports = app;
