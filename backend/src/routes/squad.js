const express = require("express");

const squadController = require("../controllers/squad");
const { isAuth, attachCurrentUser } = require("../middleware");

const router = express.Router();

// Squad Specific Routes

router.get("/:squadId", isAuth, attachCurrentUser, squadController.getSquad);

router.get("/", isAuth, attachCurrentUser, squadController.getSquads);

router.post("/", isAuth, attachCurrentUser, squadController.postSquad);

router.put("/:squadId", isAuth, attachCurrentUser, squadController.putSquad);

router.delete("/:squadId", isAuth, attachCurrentUser, squadController.deleteSquad);

// Squad Member Specific Routes

router.get("/:squadId/users", isAuth, attachCurrentUser, squadController.getSquadMembers);

router.post("/:squadId/users/:userId", isAuth, attachCurrentUser, squadController.postSquadMember);

router.delete("/:squadId/users/:userId", isAuth, attachCurrentUser, squadController.deleteSquadMember);

module.exports = router;
