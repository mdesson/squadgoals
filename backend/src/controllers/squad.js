exports.getSquad = async (req, res, next) => {  
  try {
    // Fetch squad from database
    const squad = await req.context.models.Squad.findByPk(req.params.squadId);
    const squadData = squad.dataValues;
  
    // Return squad
    res.status(201);
    res.send(squadData);
  } catch (err) {
    console.log(err)
    res.status(404);
    res.send({ error: "Could not find squad." });
  }
}

exports.getSquads = async (req, res, next) => {
  try {
    // Fetch squads from database
    const squads = await req.context.models.Squad.findAll({ where: { userId: req.user.id }});
    
    // Return No Content if the user has no squads
    if (squads.length < 1) {
      res.status(204);
      return res.send({ message: "This user has no squads."})
    }

    // Return list of squads
    res.status(200);
    res.send(squads);
  } catch (err) {
    console.log(err);
    res.status(404);
    res.send({ error: "Could not find squads."});
  }
}

exports.postSquad = async (req, res, next) => {
  // Return Bad Request if data is missing
  if (!req.body.name) {
    return res.sendStatus(400);
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

    // Return newly created squad
    res.status(201);
    res.send(squad);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send({ error: "Error creating Squad." });
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
      squad.save();
      res.status(200);
      res.send({ message: "Squad successfully updated. "})
    }
  } catch (err) {
    console.log(err);
    res.status(404)
    res.send({ error: "Could not update Squad." });
  }
}

exports.deleteSquad = async (req, res, next) => {
  try {
    // Fetch squad from database
    const squad = await req.context.models.Squad.findByPk(req.params.squadId);
  
    // Delete squad from database
    squad.destroy();
    res.status(201);
    res.send({ message: "Squad deleted." });
  } catch (err) {
    console.log(err)
    res.status(404);
    res.send({ error: "Could not find squad." });
  }
}