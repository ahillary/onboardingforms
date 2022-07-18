const router = require('express').Router();
const User = require('../db/models/user');
const { dbConnect } = require('../db');

// GET /users/:userId - find a specific user
router.get('/:id', async (req, res, next) => {
  try {
    // get just the integer that is the id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).end();
      return;
    }

    //find the user in the database with matching id
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      res.status(404).end();
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// POST /users - add a new user
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.email) {
      let error = new Error();
      error.status = 400;
      throw error;
    }

    // Ok for now to test, but not ideal
    await dbConnect.sync({ force: true });

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
      attributes: ['id', 'email', 'username', 'firstName', 'lastName'],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
