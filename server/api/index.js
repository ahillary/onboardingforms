const router = require('express').Router();

// GET home page test
router.get('/', (req, res) => {
  res.send('The server is functioning as expected.');
});

router.use('/email', require('./userRouterFindEmail'));
router.use('/username', require('./userRouterFindUsername'));
router.use('/users', require('./usersList'));
router.use('/user', require('./userRouterAddUpdate'));

router.use((req, res, next) => {
  const error = new Error('API route not found!');
  error.status = 404;
  next(error);
});

module.exports = router;
