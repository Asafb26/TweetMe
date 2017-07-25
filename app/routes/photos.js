// app/routes/photos.js

// Local dependecies
var Twitter = require('twitter');
var logger = require('winston');
var flickr = require('../model/flickr');
var client = require('../model/tweeter');

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