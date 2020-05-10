const express = require("express");

const router = express.Router();

router.get("/:userId", (req, res) => {
  res.send({
    firstName: "Johnny",
    lastName: "tester",
    email: "123@fake.com",
    aspirationalMessage: "If you can dream it, you can do it!",
  });
});

router.post("/", (req, res) => {
  res.send("Placeholder");
});

module.exports = router;
