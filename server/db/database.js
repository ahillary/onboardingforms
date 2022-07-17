const Sequelize = require('sequelize');
const pkg = require('../package.json');

const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}_test` : pkg.name;
console.log(`Opening database connection to ${dbName}`);

let db;

db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
  logging: false,
  dialect: 'postgres',
});

module.exports = db;
