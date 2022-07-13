const Sequelize = require('sequelize');
const pkg = require('../package.json');

const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}_test` : pkg.name;
console.log(`Opening database connection to ${dbName}`);

let db;

db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
  logging: false,
});

// if (process.env.DATABASE_URL) {
//     //heroku configuration
//     db = new Sequelize(process.env.DATABASE_URL, {
//       logging: false,
//       dialect: 'postgres',
//       protocol: 'postgres',
//       ssl: true,
//       dialectOptions: {
//         ssl: true,
//       },
//     });
//   } else {

//   //local configuration
//   db = new Sequelize(`postgres://localhost:5432/${databaseName}`, {
//     logging: false,
//   });
// }

module.exports = db;
