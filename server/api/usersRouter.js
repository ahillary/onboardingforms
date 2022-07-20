const router = require('express').Router();
const User = require('../db/models/user');
const { connect } = require('../db');

// GET /users/:username - find a specific user
router.get('/:username', async (req, res, next) => {
  try {
    // get just the username out of the uri request
    const username = req.params.username;
    if (!username) {
      res.status(400).end();
      return;
    }

    // find the user in the database with matching username
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    // if cannot find user in database, send 404
    if (!user) {
      res.status(404).end();
      return;
    }
    console.log('router added a user just once?');

    // send specific user info
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// GET /users - list all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // Explicitly select the desired fields - even though users' passwords are encrypted, it is unnecessary to view here. Additionally, it's poor practice to just send everything to anyone who asks.
      attributes: [
        'id',
        'email',
        'username',
        // , 'firstName', 'lastName'
      ],
    });

    // if no user list returns from database inquiry, send 404
    if (!users) return res.status(404).end();

    console.log('router got all users?');
    // send back the list with only the selected info for each user
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// POST /users - add a new user
router.post('/', async (req, res, next) => {
  try {
    // make sure there is both a username and email
    if (!req.body.username || !req.body.email) {
      let error = new Error();
      error.status = 400;
      throw error;
    }

    // add new user to database
    const addedUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    // send confirmation that the user was added
    res.status(201).json(addedUser);
  } catch (error) {
    next(error);
  }
});

// PUT - add info to a user
router.put('/:username', async (req, res, next) => {
  try {
    // find the user in the database
    const user = await User.findOne({
      where: { username: username },
    });

    // if cannot find user in database, send 404
    if (!user) return res.status(404).end();

    // update the user in the database
    const updatedUser = await user.update(req.body);

    // send confirmation that the user was updated
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
