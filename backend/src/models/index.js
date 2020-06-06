const User = require('./user');
const Auth = require('./auth');
const Squad = require('./squad');
const SquadMember = require('./squadMember');

const models = {
  User: User,
  Auth: Auth,
  Squad: Squad,
  SquadMember: SquadMember,
};

// Set Database Relations
Auth.belongsTo(User);
User.hasMany(Squad, { constraints: true, onDelete: 'CASCADE' });
Squad.belongsToMany(User, { through: SquadMember });

// Associate foreign keys
Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = models;
