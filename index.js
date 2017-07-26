// /index.js
'use strict';

var server = require('./config/initializers/server');
var nconf = require('nconf');
var async = require('async');
var logger = require('winston');

// Load Environment variables from .env file
require('dotenv').load();
// Set up configs
nconf.use('memory');
// First load command line arguments
nconf.argv();
// Load environment variables
nconf.env();

// Load config file for the environment
if (nconf.get('NODE_ENV') != null && nconf.get('NODE_ENV').match(/^(development|production)$/)) {
  nconf.file({ file: './config/environments/' + nconf.get('NODE_ENV') + '.json' });
  logger.info('[APP] running env: ', nconf.get('NODE_ENV'));
} else {
  logger.error('[APP] enviroment \'NODE_ENV\' not found (support: production | development | test), got:', nconf.get('NODE_ENV'));
  return;
}

logger.info('[APP] Starting server initialization');

// Initialize Modules (currently only server)
async.series([
  function startServer(callback) {
    server(callback);
  }], function (err) {
    if (err) {
      logger.error('[APP] initialization failed', err);
    } else {
      logger.info('[APP] initialized SUCCESSFULLY');
    }
  }
);