const router = require('express').Router();

// GET home page test
router.get('/', (req, res) => {
  res.send('test!!!');
});

router.use('/users', require('./users'));

router.use((req, res, next) => {
  console.log('REQUEST: ', req);
  console.log('RES: ', res);

  const error = new Error('API route not found!');
  error.status = 404;
  next(error);
});

module.exports = router;

// NOTE: This file can serve as a table of contents for the routers. With all routes here being already mounted on `/api`
