import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { models } from "../models";

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
    const userAuth = await models.Auth.create({
      userId: userRecord.id,
      hash: passwordHashed,
      salt: salt.toString("hex"),
    });

    const token = generateJWT(userRecord);

    return { token, user: userRecord };
  },

  async Login(email, password) {
    const user = await models.User.findByEmail(email);
    const userAuth = await models.Auth.findByUserId(user.id);

    // No user, return error message
    if (!user) return { error: "Invalid username or password" };

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
