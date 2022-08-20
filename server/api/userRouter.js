const router = require('express').Router();
const User = require('../db/models/user');
const { connect } = require('../db');

// GET /user - find the most recently created user
// It would be ideal to use the user.id to find a user because the database automatically assigns unique ids. However, in the edge case that more than one individual is creating an account simutaneously it would mess up the process with this as written because it depends on finding the most recent user created:

// router.get('/', async (req, res, next) => {
//   try {
//     // find the user in the database that was last entered
//     var user = await User.findAll({
//       limit: 1,
//       order: [['createdAt', 'DESC']],
//     });

//     // if cannot find user in database, send 404
//     if (!user) {
//       res.status(404).end();
//       return;
//     }
//     user = user[0];

//     // send specific user info
//     res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// });

// POST /user - add/create a new user
router.post('/', async (req, res, next) => {
  try {
    // make sure there is both a username and email
    if (!req.body.username || !req.body.email) {
      let error = new Error();
      error.status = 400;
      throw error;
    }

    // add new user to database
    const addedUser = await User.create(req.body);
    // send confirmation that the user was added
    res.status(201).json(addedUser);
  } catch (error) {
    next(error);
  }
});

// PUT - add info to an existing user
router.put('/:email', async (req, res, next) => {
  // This request comes along with email and:
  // from formTwo: firstName, lastName, number
  // from formThree: streetAddress, city, state, zipCode
  console.log('req.body: ', req.body);

  const email = req.params.email;
  try {
    // Does this user exist in the database?
    const user = await User.findOne({
      where: { email: email },
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
