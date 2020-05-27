const express = require("express");
var multer = require("multer");
var fs = require("fs");
var path = require("path");

var { authService } = require("../services");
var { isAuth, attachCurrentUser } = require("../middleware");

const router = express.Router();
const upload = multer();

router.get("/:userId", isAuth, attachCurrentUser, async (req, res) => {
  if (req.user.id !== req.params.userId) return res.sendStatus(401);
  const user = await req.context.models.User.findById(req.params.userId);
  const userData = user.dataValues;

  // Delete extraneous data
  delete userData.createdAt;
  delete userData.updatedAt;

  res.send(userData);
});

router.get("/avatar/:userId", isAuth, attachCurrentUser, (req, res) => {
  let filePath = path.join(__dirname, `../../data/${req.params.userId}.jpg`);
  if (fs.existsSync(filePath)) res.sendFile(filePath);
  else res.sendStatus(404);
});

router.post("/", upload.single("avatar"), async (req, res) => {
  // Return error if data is missing
  let fileName = false;
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.aspirationalMessage
  ) {
    res.sendStatus(400);
    return;
  }
  try {
    const { token, user } = await authService.SignUp(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.aspirationalMessage,
      req.body.password
    );

    fileName = user.dataValues.id + ".jpg";
    // Success, return status code Created
    res.status(201);
    res.send({ token, user });
  } catch (err) {
    // Error saving user to database
    res.status(400);
    console.log(err);
    res.send({ error: "Error creating user. Email may be in use." });
  }
  if (fileName) {
    // Avatar included in POST
    if (req.file) fs.writeFile(`data/${fileName}`, req.file.buffer, () => {});
    // No avatar in request, use default image
    else
      fs.copyFile("public/default-avatar.png", `data/${fileName}`, (err) => {
        if (err) throw err;
      });
  }
});

router.post("/login", async (req, res) => {
  const { token, user, error } = await authService.Login(
    req.body.email,
    req.body.password
  );

  if (error) {
    res.status(401);
    res.send({ error });
  } else res.send({ token, user });
});

module.exports = router;
