const router = require('express').Router();

// GET home page test
router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/users', require('./users'));

router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;

// NOTE: This file can serve as a table of contents for the routers. With all routes here being already mounted on `/api`
