const express = require("express");

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const user = await req.context.models.User.findById(req.params.userId);
  const userData = user.dataValues;
  // Delete extraneous data
  delete userData.createdAt;
  delete userData.updatedAt;

  res.send(userData);
});

router.post("/", (req, res) => {
  // res.sendStatus(201)
  res.send("Placeholder");
});

module.exports = router;
