const crypto = require('crypto');
const { Sequelize } = require('sequelize');
const connect = require('../connect');

const User = connect.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      // for ease of testing
      // isEmail: true,
      notEmpty: true,
      notNull: true,
    },
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON. This is a work around to get past Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password');
    },
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON. This is a work around to get past Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt');
    },
  },
  firstName: {
    type: Sequelize.STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: { args: true, msg: 'You must enter your name' },
    //   notNull: { args: true, msg: 'You must enter your name' },
    // },
  },
  lastName: {
    type: Sequelize.STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: { args: true, msg: 'You must enter your name' },
    //   notNull: { args: true, msg: 'You must enter your name' },
    // },
  },
  phone: {
    type: Sequelize.STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: { args: true, msg: 'You must enter your phone number' },
    //   notNull: { args: true, msg: 'You must enter your phone number' },
    //   len: { args: [10, 10], msg: 'Phone number is invalid' },
    //   isInt: { args: true, msg: 'You must enter your phone number' },
    //   min: 0,
    // },
  },
  streetAddress: {
    type: Sequelize.STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: { args: true, msg: 'You must enter your full address' },
    //   notNull: { args: true, msg: 'You must enter your full address' },
    // },
  },
  city: {
    type: Sequelize.STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: { args: true, msg: 'You must enter your full address' },
    //   notNull: { args: true, msg: 'You must enter your full address' },
    // },
  },
  state: {
    type: Sequelize.STRING,
    // allowNull: false,
    // defaultValue: 'CA',
    // validate: {
    //   notEmpty: true,
    //   notNull: true,
    // },
  },
  zipCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 00001,
    validate: {
      notEmpty: true,
      notNull: true,
      len: { args: [[5, 5]], msg: 'Zip code is not valid' },
      min: 00001,
      max: 99950,
    },
  },
});

// instance methods for User
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

// class methods for User
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

// hook
const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;
