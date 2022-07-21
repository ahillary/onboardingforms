const router = require('express').Router();

// GET home page test
router.get('/', (req, res) => {
  res.send('The server is functioning as expected.');
});

router.use('/api/users', require('./usersRouter'));
router.use('/api/user', require('./userRouter'));

router.use((req, res, next) => {
  const error = new Error('API route not found!');
  error.status = 404;
  next(error);
});

module.exports = router;
