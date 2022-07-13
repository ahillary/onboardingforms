/* The purpose of this module is to bring the Sequelize instance (`db`) together with any models that are defined separately in this directory). */

const db = require('./database');
const User = require('./userModel');

module.exports = {
  db,
  User,
};
