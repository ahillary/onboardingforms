const { db, User } = require('./server/db');

const users = [
  {
    email: 'build@barn.com',
    username: 'buildingbarns',
    password: '',
    salt: '',
    firstName: 'Sally',
    lastName: 'McGee',
    number: 1234567899,
    streetAddress: '22 Barn St',
    city: 'Barn',
    state: 'CA',
    zipCode: 12345,
  },
  {
    email: 'this@that.com',
    username: 'thisandthat',
    password: 'password',
    firstName: 'Phee',
    lastName: 'McGee',
    number: 1234567890,
    streetAddress: '22 Barn St',
    city: 'Barn',
    state: 'CA',
    zipCode: 12456,
  },
  {
    email: 'huck@dog.com',
    username: 'huckelberrythedog',
    password: 'password',
    firstName: 'Huckelberry',
    lastName: 'Dog',
    number: 1234567898,
    streetAddress: '22 Dog St',
    city: 'Dogtown',
    state: 'CA',
    zipCode: 12344,
  },
];

const seed = async () => {
  await db.sync({ force: true });
  console.log(`db synced!`);
  await Promise.all(
    users.map((user) => {
      return User.create(user);
    })
  );
};

async function runSeed() {
  console.log(`seeding...`);
  try {
    await seed().then(() => {
      console.log(`Seeding success!`);
      db.close();
    });
  } catch (error) {
    console.log(`error seeding: ${error}`);
    db.close();
  }
}

module.exports = seed;
// If this module is being required from another module, then we just export the function, to be used as necessary. But it will run right away if the module is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  runSeed();
}
