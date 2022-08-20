const router = require('express').Router();
const User = require('../db/models/user');
const { connect } = require('../db');

// GET /:email - find a specific user using email address as identifier
router.get('/:email', async (req, res, next) => {
  // get just the email out of the uri request
  const email = req.params.email;
  if (!email) {
    res.status(400).end();
    return;
  }
  try {
    // Does this user exist in the database?
    const user = await User.findOne({
      where: { email: email },
    });

    //  If cannot find user in database, send 404
    if (!user) {
      res.status(200).json('ok').end();
      return;
    }

    // send specific user's email only
    res.status(200).json(user.email);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
