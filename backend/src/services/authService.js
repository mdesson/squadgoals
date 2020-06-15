const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");

const models = require("../models");

const AuthService = {
  async SignUp(firstName, lastName, email, aspirationalMessage, password) {
    // Create the user
    const userRecord = await models.User.create({
      firstName,
      lastName,
      email,
      aspirationalMessage,
    });

    // Generate salt and use it to hash password
    const salt = randomBytes(32);
    const passwordHashed = await argon2.hash(password, { salt });

    // Generate auth
    await models.Auth.create({
      userId: userRecord.id,
      hash: passwordHashed,
      salt: salt.toString("hex"),
    });

    const token = generateJWT(userRecord);

    return { token, user: userRecord };
  },

  async Login(email, password) {
    const user = await models.User.findOne({ where: { email: email } });

    // No user, return error message
    if (!user) return { error: "Invalid username or password" };

    const userAuth = await models.Auth.findOne({ where: { userId: user.id } });

    // Invalid password, return error message
    const passwordValid = await argon2.verify(
      userAuth.dataValues.hash,
      password
    );
    if (!passwordValid) return { error: "Invalid username or password" };

    const token = generateJWT(user.dataValues);
    return { token, user: user.dataValues };
  },
};

const generateJWT = (user) => {
  return jwt.sign(
    {
      data: user,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

module.exports = AuthService;
