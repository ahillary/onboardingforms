const Sequelize = require('sequelize');
const pkg = require('../package.json');

const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}_test` : pkg.name;
console.log(`Opening database connection to ${dbName}`);

let connect;

connect = new Sequelize(`postgres://localhost:5432/${dbName}`, {
  logging: false,
  dialect: 'postgres',
});

module.exports = connect;
