// app/routes/news.js

// Local dependecies
var logger = require('winston');
var client = require('../model/tweeter');
const GoogleNewsRss = require('google-news-rss');
const googleNews = new GoogleNewsRss();

module.exports = function (router) {
    'use strict';
    router.route('/')
        //Search for a tweet
        .post(function (req, res, next) {
            googleNews
                .search(req.body.subject)
                .then(function (response) {
                    if (response.length > 0) {
                        var rand = require('random-seed').create();
                        var randNews = response[Math.floor(rand.random() * response.length)];
                        client.post('statuses/update', { status: randNews.link }, function (error, tweet, response) {
                            if (error) logger.error("[tweets] " + req.connection.remoteAddress + ": " + error[0].message);
                            else {
                                logger.info(tweet);   // Tweet body. 
                            }
                            res.json(response);  // Raw response object.
                        });
                    }
                    else {
                        res.json({ "statusCode": 200, "body": "news not found" });
                    }
                }

                );
        });
};