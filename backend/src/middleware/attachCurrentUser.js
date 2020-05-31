const attachCurrentUser = async (req, res, next) => {
  try {
    // Extract user data from request and fetch all user data from database
    const decodedUser = req.token.data.id;
    const user = await req.context.models.User.findByPk(decodedUser);

    // Unauthorized if no user found
    if (!user) res.status(401).end();

    // Add user to the request
    req.user = user.dataValues;
    return next();
  } catch (err) {
    return res.json(err).status(500);
  }
};

module.exports = attachCurrentUser;
