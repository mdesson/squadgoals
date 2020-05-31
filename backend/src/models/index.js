const User = require('./user');
const Auth = require('./auth');
const Squad = require('./squad');

const models = {
  User: User,
  Auth: Auth,
  Squad: Squad,
};

// Set Database Relations
Auth.belongsTo(User);
User.hasMany(Squad, { constraints: true, onDelete: 'CASCADE' });

// Associate foreign keys
Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = models;
