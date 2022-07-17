const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const debug = require('debug')('server:server');
const http = require('http');

//connect-sesseion-sequelize with express 4:
const Sequelize = require('sequelize');
// initalize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const db = require('./db');
console.log(`Why won't the SequelizeStore get set up properly?`);
const sessionStore = new SequelizeStore({
  db: db,
  dialect: 'postgres',
});
console.log('FIND ME');
const socketio = require('socket.io');
const indexRouter = require('./api/');

const app = express();

const createApp = () => {
  app.use(logger('dev'));

  app.use(cookieParser());

  // cross origin middleware
  app.use(cors());

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // static middleware
  app.use(express.static(path.join(__dirname, 'public')));

  // api route
  app.use('/', indexRouter);

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.error(err.stack);

    // render the error page
    res.status(err.status || 500).send(err.message || 'Internal server error.');
    res.render('error. error.');
  });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
};

const syncDb = () => {
  console.log('db.sync() not working. Why? What is the db? ', db);
  db.sync();
};

const startListening = () => {
  // Get port from environment and store in Express.
  const port = normalizePort(process.env.PORT || '4000');

  app.set('Ready to go on port ', port);

  // Create HTTP server.
  const server = http.createServer(app);

  // Listen on provided port, on all network interfaces.
  server.listen(port, () => console.log(`Ready to go on port ${port}`));
  server.on('error', onError);
  server.on('listening', onListening);

  // set up our socket control center
  const io = socketio(server);
  require('./db/socket')(io);

  // *** Helper Functions ***

  //Normalize a port into a number, string, or false.
  function normalizePort(value) {
    var port = parseInt(value, 10);
    if (isNaN(port)) {
      return value;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  }

  // Event listener for HTTP server "error" event.
  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  // Event listener for HTTP server "listening" event.
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
};

async function bootApp() {
  await sessionStore.sync();
  await syncDb();
  await createApp();
  await startListening();
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp();
} else {
  createApp();
}

module.exports = app;
