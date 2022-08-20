const router = require('express').Router();
const User = require('../db/models/user');
const { connect } = require('../db');

// GET /user/:email - find a specific user using email address as identifier

router.get('/:email', async (req, res, next) => {
  // get just the email out of the uri request
  const email = req.params.email;

  if (!email && !username) {
    res.status(400).end();
    return;
  }
  try {
    // Does this user exist in the database?
    const user = await User.findOne({
      where: { email: email } || { username: username },
    });

    //  If cannot find user in database, send 404
    if (!user) {
      res.status(404).end();
      return;
    }

    // send specific user info
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
