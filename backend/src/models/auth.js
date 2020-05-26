import user from "./user";

const auth = (sequelize, DataTypes) => {
  const Auth = sequelize.define("auth", {
    hash: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    salt: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  // User find functions
  Auth.findByUserId = async (userId) => {
    let auth = await Auth.findOne({
      where: { userId: userId },
    });

    return auth;
  };

  return Auth;
};

module.exports = auth;
