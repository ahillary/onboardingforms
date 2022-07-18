// The purpose of this module is a directory to bring the Sequelize instance (`db`) together with any models that are defined separately.

const dbConnect = require('./dbConnect');

// register model
require('./models/user');

module.exports = {
  dbConnect,
};
