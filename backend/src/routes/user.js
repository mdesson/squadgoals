const express = require("express");
var multer = require("multer");
var fs = require("fs");

const router = express.Router();
const upload = multer();

router.get("/:userId", async (req, res) => {
  const user = await req.context.models.User.findById(req.params.userId);
  const userData = user.dataValues;

  // Delete extraneous data
  delete userData.createdAt;
  delete userData.updatedAt;

  res.send(userData);
});

router.post("/", upload.single("avatar"), async (req, res) => {
  // Return error if data is missing
  let fileName = false;
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.aspirationalMessage ||
    !req.file
  ) {
    res.sendStatus(400);
    return;
  }
  try {
    const user = await req.context.models.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      aspirationalMessage: req.body.aspirationalMessage,
    });
    fileName = user.dataValues.id + ".jpg";
    // Success, return status code Created
    res.sendStatus(201);
  } catch (err) {
    // Error saving user to database
    // if (req.body.firstName === "Sally") console.log(err);
    res.status(400);
    res.send({ error: "Error creating user. Email may be in use." });
  }
  if (fileName) {
    fs.writeFile(`data/${fileName}`, req.file.buffer, () => {});
  }
});

module.exports = router;
