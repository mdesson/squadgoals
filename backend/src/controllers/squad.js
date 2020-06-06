const { Op } = require("sequelize");
const { isEmpty } = require("lodash");

// Squad Specific Routes
exports.getSquad = async (req, res, next) => {
  try {
    // Fetch squad from database
    const squad = await req.context.models.Squad.findByPk(req.params.squadId);
    const squadData = squad.dataValues;

    // Return squad
    res.status(201).send(squadData);
  } catch (err) {
    console.log(err)
    res.status(404).send({
      error: "Could not find squad."
    });
  }
}

exports.getSquads = async (req, res, next) => {
  try {
    // Fetch squads from database
    const squads = await req.context.models.Squad.findAll({ where: { userId: req.user.id } });

    // Return No Content if the user has no squads
    if (squads.length < 1) {
      return res.status(204).send({
        message: "This user has created no squads."
      })
    }

    // Return list of squads
    res.status(200).send(squads);
  } catch (err) {
    console.log(err);
    res.status(404).send({
      error: "Could not find squads."
    });
  }
}

exports.postSquad = async (req, res, next) => {
  // Return Bad Request if data is missing
  if (!req.body.name) {
    return res.sendStatus(400).send({
      error: "No squad name provided."
    });
  }

  const name = req.body.name;
  const userId = req.user.id;

  try {
    const currentUser = await req.context.models.User.findByPk(userId);

    // Create Squad
    const squad = await currentUser.createSquad({
      name: name,
      memberCount: 1
    });

    // Add self to Squad
    squad.addUser(currentUser);

    // Return newly created Squad
    res.status(201).send(squad);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: "Error creating Squad."
    });
  }
}

exports.putSquad = async (req, res, next) => {
  const updatedName = req.body.name;

  try {
    // Fetch squad from database
    const squad = await req.context.models.Squad.findByPk(req.params.squadId);

    // Update squad if it exists
    if (squad) {
      squad.name = updatedName;
      await squad.save();
      res.status(200).send({
        message: "Squad successfully updated."
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({
      error: "Could not update Squad."
    });
  }
}

exports.deleteSquad = async (req, res, next) => {
  try {
    // Fetch squad from database
    const squad = await req.context.models.Squad.findByPk(req.params.squadId);

    // Delete squad from database
    await squad.destroy();
    res.status(201).send({
      message: "Squad deleted."
    });
  } catch (err) {
    console.log(err)
    res.status(404).send({
      error: "Could not find squad."
    });
  }
}

// Squad Member Specific Routes

exports.getSquadMembers = async (req, res, next) => {
  try {
    // Fetch All Squad Members from the database
    const squad = await req.context.models.Squad.findByPk(req.params.squadId);
    const squadMembers = await req.context.models.SquadMember.findAll({
      where: { squadId: squad.id }
    })

    let userList = [];

    // Retrieve information from all Users
    await Promise.all(squadMembers.map(async member => {
      const userData = await req.context.models.User.findByPk(member.userId);
      userList.push(userData);
    }));

    res.status(200).send(userList);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: "Could not retrieve squad members"
    })
  }
}

exports.postSquadMember = async (req, res, next) => {
  try {
    // Fetch Squad and User to be added from database
    const squad = await req.context.models.Squad.findByPk(req.params.squadId);
    const newSquadMember = await req.context.models.User.findByPk(req.params.userId);

    // Returns empty array if no duplicate SquadMember is found
    const duplicateSquadMember = await req.context.models.SquadMember.findAll({
      where: {
        [Op.and]: [
          { userId: newSquadMember.id },
          { squadId: squad.id }
        ]
      }
    });

    // Check if User is already a member of the Squad
    if (!isEmpty(duplicateSquadMember)) {
      return res.status(400).send({
        error: "User has already been added to this squad"
      });
    }

    // Check if the Squad already has 10 SquadMembers
    if (squad.memberCount > 9) {
      return res.status(400).send({
        error: "Squad is already at its maximum capacity."
      })
    }

    // Add new User to Squad
    await squad.addUser(newSquadMember);
    await squad.increment('memberCount', { by: 1 });

    res.status(201).send({
      message: "User added to the squad."
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: "Could not add user to the squad."
    });
  }
}

exports.deleteSquadMember = async (req, res, next) => {
  try {
    // Fetch Squad and User to be added from database
    const squad = await req.context.models.Squad.findByPk(req.params.squadId);
    const userToDelete = await req.context.models.User.findByPk(req.params.userId);

    const squadMember = await req.context.models.SquadMember.findAll({
      where: {
        [Op.and]: [
          { userId: userToDelete.id },
          { squadId: squad.id }
        ]
      }
    });

    // Check to see if user is a member of this Squad
    if (!isEmpty(squadMember)) {
      return res.status(400).send({
        error: "That user is not a member of this squad."
      });
    }

    // Delete Squad Member from database
    await squadMember[0].destroy();
    res.status(201).send({
      message: "User removed from the squad."
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: "Could not remove the user from the squad."
    })
  }
}