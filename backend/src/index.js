require("dotenv/config");
const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const sequelize = require('./util/database')
const { appContext } = require("./middleware");
const populateDatabase = require('./util/populateDatabase');

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
    populateDatabase();
  }
  app.listen(process.env.PORT, () => {
    console.log(`frontend is listening on port ${process.env.PORT}`);
  });
});

module.exports = app;
