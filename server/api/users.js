const router = require('express').Router();
const { User } = require('../db');

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
    console.log('request: ', req.body);
    //sequelize is not creating the user.
    // try sequelize debug mode
    //
    //remove console.logs
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    const oneUser = User.build(req.body);
    console.log('built: ', oneUser);
    await oneUser.save();
    console.log(oneUser instanceof User);
    console.log(oneUser.email);
    // const addedUser = await User.create(req.body);
    res.status(201).json(oneUser);
    console.log('added: ');
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

// testing
router.get('/', (req, res) => {
  res.send('Hellooo World!');
});

module.exports = router;
