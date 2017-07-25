// app/models/flickr.js

var config = require('nconf');
var Flickr = require('flickr-sdk');

var flickr = new Flickr({
    "apiKey": config.get('FLICKR_KEY'),
    "apiSecret": config.get('FLICKR_SECRET'),
});

module.exports = flickr;