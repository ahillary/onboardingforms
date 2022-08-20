const router = require('express').Router();
const User = require('../db/models/user');
const { connect } = require('../db');

// POST /user - create(add) a new user in db
router.post('/', async (req, res, next) => {
  // make sure there is both a username and email
  if (!req.body.username || !req.body.email) {
    let error = new Error();
    error.status = 400;
    throw error;
  }
  try {
    // add new user to database
    const addedUser = await User.create(req.body);
    // send confirmation that the user was added by sending new user info
    res.status(201).json(addedUser);
  } catch (error) {
    next(error);
  }
});

// PUT - add info to an existing user
router.put('/:email', async (req, res, next) => {
  const email = req.params.email;
  // This request comes along with email and:
  // from formTwo: firstName, lastName, number
  // from formThree: streetAddress, city, state, zipCode
  console.log('req.body: ', req.body);

  try {
    // Does this user exist in the database?
    const user = await User.findOne({
      where: { email: email },
    });

    // if cannot find user in database, send 404
    if (!user) {
      res.status(404).end();
      return;
    }

    // update the user in the database
    const updatedUser = await user.update(req.body);

    // send confirmation that the user was updated by sending user info
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
