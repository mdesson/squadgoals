require("dotenv/config");
var express = require("express");
var routes = require("./routes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", routes.user);

app.listen(process.env.PORT, () => {
  console.log(`frontend is listening on port ${process.env.PORT}`);
});

module.exports = app;
