// app/routes/tweets.js

// Local dependecies
var config = require('nconf');
var Twitter = require('twitter');
var logger = require('winston');
var Flickr = require('flickr-sdk');

var flickr = new Flickr({
    "apiKey": config.get('FLICKR_KEY'),
    "apiSecret": config.get('FLICKR_SECRET'),
});

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
            // Create new random photo filtered by subject
            flickr
                .request()
                .media()
                .search(req.body.subject)
                .get()
                .then(function (response) {
                    if (response.body.photos.photo.length > 0) {
                        var rand = require('random-seed').create();
                        console.log("RAND! " + rand.random());
                        var randImage = response.body.photos.photo[Math.floor(rand.random() * response.body.photos.photo.length)];
                        flickr
                            .request()
                            .media(randImage.id)
                            .get()
                            .then(function (response) {
                                client.post('statuses/update', { status: response.body.photo.urls.url[0]._content }, function (error, tweet, response) {
                                    if (error) logger.error("[tweets] " + req.connection.remoteAddress + ": " + error[0].message);
                                    else {
                                        logger.info(tweet);   // Tweet body. 
                                    }
                                    res.json(response);  // Raw response object.
                                });
                            });
                    }
                    else {
                        res.json({ "statusCode": 200, "body": "photo not found" });
                    }
                });
        });
};