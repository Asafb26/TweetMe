process.env.NODE_ENV = 'test';

var nconf = require('nconf');
// Set up configs
nconf.use('memory');
// First load command line arguments
nconf.argv();
// Load environment variables
nconf.env();
// Load env from file
nconf.file({ file: './config/environments/' + nconf.get('NODE_ENV') + '.json' });


//test configure
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../config/initializers/server')();
let should = chai.should();
chai.use(chaiHttp);


exports.chai = chai;
exports.should = should;
exports.server = server;
