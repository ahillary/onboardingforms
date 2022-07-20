const router = require('express').Router();
const User = require('../db/models/user');
const { connect } = require('../db');

// GET /users/:username - find a specific user
// router.get('/:username', async (req, res, next) => {
//   try {
//     // get just the username out of the req
//     const username = req.params.username;
//     if (isNaN(username)) {
//       res.status(400).end();
//       return;
//     }

//     //find the user in the database with matching username
//     const user = await User.findOne({
//       where: {
//         username: username,
//       },
//     });

//     if (!user) {
//       res.status(404).end();
//       return;
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// });

// POST /users - add a new user
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.email) {
      let error = new Error();
      error.status = 400;
      throw error;
    }

    const addedUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json(addedUser);
  } catch (error) {
    next(error);
  }
});

// PUT - add info to a user
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: id },
    });
    if (!user) return res.status(404).end();

    const updatedUser = await user.update(req.body);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// list all users
router.get('/', async (req, res, next) => {
  try {
    const user = await User.findAll({
      // Explicitly select the desired fields - even though users' passwords are encrypted, it is unnecessary to view here. Additionally, it's poor practice to just send everything to anyone who asks.
      attributes: [
        'id',
        'email',
        'username',
        // , 'firstName', 'lastName'
      ],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
