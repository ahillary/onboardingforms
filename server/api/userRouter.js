const router = require('express').Router();
const User = require('../db/models/user');
const { connect } = require('../db');

// GET /user - find the most recently created user
router.get('/', async (req, res, next) => {
  try {
    // find the user in the database that was last entered
    var user = await User.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']],
    });

    // if cannot find user in database, send 404
    if (!user) {
      res.status(404).end();
      return;
    }
    user = user[0];

    // send specific user info
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// while it would be ideal to use the user.id to find a user, in the edge case that more than one individual is creating an account simutaneously it would mess up the process with this function as written:

// GET /user/:id - find a specific user

// router.get('/:id', async (req, res, next) => {
//   try {
//     // get just the id out of the uri request
//     const id = req.params.id;
//     if (!id) {
//       res.status(400).end();
//       return;
//     }

//     // find the user in the database with matching id
//     const user = await User.findOne({
//       where: {
//         id: id,
//       },
//     });

//     // if cannot find user in database, send 404
//     if (!user) {
//       res.status(404).end();
//       return;
//     }

//     // send specific user info
//     res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
