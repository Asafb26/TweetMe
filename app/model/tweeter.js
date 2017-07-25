// app/models/tweeter.js

var config = require('nconf');
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: config.get('TWITTER_CONSUMER_KEY'),
    consumer_secret: config.get('TWITTER_CONSUMER_SECRET'),
    access_token_key: config.get('TWITTER_ACCESS_TOKEN_KEY'),
    access_token_secret: config.get('TWITTER_ACCESS_TOKEN_SECRET')
});

module.exports = client;