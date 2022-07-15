// The purpose of this module is a directory to bring the Sequelize instance (`db`) together with any models that are defined separately.

const db = require('./database');
const User = require('./userModel');

module.exports = {
  db,
  User,
};
