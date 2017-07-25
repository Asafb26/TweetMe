// app/routes/tweets.js

// Local dependecies
var config = require('nconf');
var Twitter = require('twitter');
var logger = require('winston');

var client = new Twitter({
    consumer_key: config.get('TWITTER_CONSUMER_KEY'),
    consumer_secret: config.get('TWITTER_CONSUMER_SECRET'),
    access_token_key: config.get('TWITTER_ACCESS_TOKEN_KEY'),
    access_token_secret: config.get('TWITTER_ACCESS_TOKEN_SECRET')
});

module.exports = function (router) {
    'use strict';
    router.route('/')
        .post(function (req, res, next) {
            // easter egg
            client.post('statuses/update', { status: req.body.message }, function (error, tweet, response) {
                if (error) logger.error("[tweets] " + req.connection.remoteAddress + ": " + error[0].message);
                else {
                    logger.info(tweet);   // Tweet body. 
                }
                res.json(response);  // Raw response object.
            });
        });
};