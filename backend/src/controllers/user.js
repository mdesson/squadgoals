const path = require("path");
const fs = require("fs");


const { authService } = require("../services");


exports.getUser = (req, res, next) => {
  // userId is a string so !== returns true
  if (req.user.id != req.params.userId) {
    return res.sendStatus(401);
  }

  let userData;

  req.context.models.User
    .findById(req.params.userId)
    .then(user => {
      userData = user.dataValues;

      // Delete extraneous data
      delete userData.createdAt;
      delete userData.updatedAt;

      res.send(userData);
    })
    .catch(err => console.log(err))
};

exports.getUserAvatar = (req, res, next) => {
  let filePath = path.join(__dirname, `../../data/${req.params.userId}.jpg`);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  }
  else {
    res.sendStatus(404);
  }
}

exports.postUser = async (req, res, next) => {
  // Return error if data is missing
  let fileName = false;

  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.aspirationalMessage
  ) {
    return res.sendStatus(400);
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
    if (req.file) fs.writeFile(`data/${fileName}`, req.file.buffer, () => { });
    // No avatar in request, use default image
    else
      fs.copyFile("public/default-avatar.png", `data/${fileName}`, (err) => {
        if (err) throw err;
      });
  }
}

exports.postLogin = async (req, res, next) => {
  const { token, user, error } = await authService.Login(
    req.body.email,
    req.body.password
  );

  if (error) {
    res.status(401);
    res.send({ error });
  } else res.send({ token, user });
}