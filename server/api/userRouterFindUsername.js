const router = require('express').Router();
const User = require('../db/models/user');
const { connect } = require('../db');

// GET /:username - find a specific user using username as identifier
router.get('/:username', async (req, res, next) => {
  // get just the username out of the uri request
  const username = req.params.username;
  if (!username) {
    res.status(400).end();
    return;
  }
  try {
    // Does this user exist in the database?
    const user = await User.findOne({
      where: { username: username },
    });

    //  If cannot find user in database, send 404
    if (!user) {
      res.status(404).end();
      return;
    }

    // return specific user's username only
    res.status(200).json(user.username);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
