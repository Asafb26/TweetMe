// config/initializers/server.js

var express = require('express');
var path = require('path');

// Local dependecies
var config = require('nconf');

// create the express app
// configure middlewares
var bodyParser = require('body-parser');
var morgan = require('morgan');
var logger = require('winston');
var app;

var start = function (cb) {
  'use strict';
  // Configure express 
  app = express();
  if (config.get('NODE_ENV') !== 'test') {
    app.use(morgan('common'));
  }
  else{
    logger.level = 'warning';
  }

  // parse application/x-www-form-urlencoded 
  app.use(bodyParser.urlencoded({ extended: true }));

  // parse any json 
  app.use(bodyParser.json({ type: '*/*' }));
  logger.info('[SERVER] Initializing routes');
  require('../../app/routes/index')(app);

  app.use(express.static(path.join(__dirname, 'public')));

  // Error handler
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: (app.get('env') === 'development' ? err : {})
    });
    next(err);
  });
  logger.warn("PORT IS:  " + config.get('PORT'));
  app.listen(config.get('PORT'));
  logger.info('[SERVER] Listening on port ' + config.get('PORT'));

  if (cb) {
    return cb();
  }
  else{
    return app; //for testing purporse
  }
};

module.exports = start;