// /index.js
'use strict';

var server = require('./config/initializers/server');
var nconf = require('nconf');
var async = require('async');
var logger = require('winston');

// Load Environment variables from .env file
require('dotenv').load();

// Set up configs In-RAM only
nconf.use('memory');

// Load command line arguments and enviroment
nconf.argv().env();

// Load config file for the environment
if (nconf.get('NODE_ENV').match(/^(development|production)$/)) {
    require('./config/environments/' + nconf.get('NODE_ENV'));
} else {
    logger.error('[APP] enviroment module not found:', nconf.get('NODE_ENV'));
    return;
}

logger.info('[APP] Starting server initialization');

// Initialize Modules (currently only server)
async.series([
  function startServer(callback) {
    server(callback);
  }], function(err) {
    if (err) {
      logger.error('[APP] initialization failed', err);
    } else {
      logger.info('[APP] initialized SUCCESSFULLY');
    }
  }
);