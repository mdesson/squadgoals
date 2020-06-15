const express = require("express");
const multer = require("multer");

const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuth').isAuth;
const attachCurrentUser = require('../middleware/attachCurrentUser');

const upload = multer();

const router = express.Router();

router.get("/:userId", isAuth, attachCurrentUser, userController.getUser);

router.get("/avatar/:userId", isAuth, attachCurrentUser, userController.getUserAvatar);

router.post("/", upload.single("avatar"), userController.postUser);

router.post("/login", userController.postLogin);

module.exports = router;