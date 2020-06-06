require("dotenv/config");
const express = require("express");
const fs = require("fs");
const cors = require("cors");

const routes = require("./routes");
const sequelize = require('./util/database')
const { appContext } = require("./middleware");
const { authService } = require("./services");

const app = express();
const eraseDatabaseOnStart = false; // db cleared and repopulated on start

//// Middleware ////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(appContext); // Add app context to each request

//// Routes ////
app.use("/users", routes.user);
app.use("/squads", routes.squad);

// Start app (erase db if flag is true)
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
  // Create users and their associated auth
  let signUp1 = await authService.SignUp(
    "Postman",
    "Pat",
    "pat@royal-mail.co.uk",
    "mailPaatternBaldness",
    "Post man Pat and his black and white cat"
  );
  let signUp2 = await authService.SignUp(
    "Fireman",
    "Sam",
    "sam@firestation.com",
    "imFireOnTheDanceFloor",
    "He's always on the scene, Fireman Sam!"
  );

  // Create users' avatars
  fs.copyFile(
    "test/sampleData/avatar.jpg",
    `data/${signUp1.user.dataValues.id}.jpg`,
    (err) => {
      if (err) throw err;
    }
  );
  fs.copyFile(
    "test/sampleData/avatar.jpg",
    `data/${signUp2.user.dataValues.id}.jpg`,
    (err) => {
      if (err) throw err;
    }
  );
};

module.exports = app;
