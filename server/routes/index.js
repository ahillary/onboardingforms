var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// const router = require('express').Router();

// /* NOTE: This file would serve as a table of contents for the routers. With all routes here being already mounted on `/api`
// Alternatively it could be the homepage router*/

// router.use('/users', require('./users'));
//
// router.use((req, res, next) => {
//   const err = new Error('API route not found!');
//   err.status = 404;
//   next(err);
// });

// module.exports = router;
