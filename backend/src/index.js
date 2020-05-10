require("dotenv/config");
var express = require("express");
var fs = require("fs");
var routes = require("./routes");
var { models, sequelize } = require("./models");

const app = express();
const eraseDatabaseOnStart = true; // db cleared and repopulated on start

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
    console.log("Database erased. Repopulating.");
    createSampleUsers();
  }
  app.listen(process.env.PORT, () => {
    console.log(`frontend is listening on port ${process.env.PORT}`);
  });
});

// Populate database functions
const createSampleUsers = async () => {
  let user1 = await models.User.create({
    firstName: "Postman",
    lastName: "Pat",
    email: "pat@royal-mail.co.uk",
    aspirationalMessage: "Post man Pat and his black and white cat",
  });
  let user2 = await models.User.create({
    firstName: "Fireman",
    lastName: "Sam",
    email: "sam@firestation.com",
    aspirationalMessage: "He's always on the scene, Fireman Sam!",
  });

  // Create users' avatars
  fs.copyFile(
    "test/sampleData/avatar.jpg",
    `data/${user1.dataValues.id}.jpg`,
    (err) => {
      if (err) throw err;
    }
  );
  fs.copyFile(
    "test/sampleData/avatar.jpg",
    `data/${user2.dataValues.id}.jpg`,
    (err) => {
      if (err) throw err;
    }
  );
};

module.exports = app;
