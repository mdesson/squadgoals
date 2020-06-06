const express = require("express");

const squadController = require('../controllers/squad');
const { isAuth, attachCurrentUser } = require('../middleware');

const router = express.Router();

router.get("/:squadId", isAuth, attachCurrentUser, squadController.getSquad);

router.get("/", isAuth, attachCurrentUser, squadController.getSquads);

router.post("/", isAuth, attachCurrentUser, squadController.postSquad);

router.put("/:squadId", isAuth, attachCurrentUser, squadController.putSquad);

router.delete("/:squadId", isAuth, attachCurrentUser, squadController.deleteSquad);

module.exports = router;