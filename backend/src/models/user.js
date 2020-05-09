const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    aspirationalMessage: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  // User find functions
  User.findById = async (userId) => {
    let user = await User.findOne({
      where: { id: userId },
    });

    return user;
  };

  User.findByEmail = async (emailAddress) => {
    let user = await User.findOne({
      where: { email: emailAddress },
    });

    return user;
  };

  return User;
};

module.exports = user;
