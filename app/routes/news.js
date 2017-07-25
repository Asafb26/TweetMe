// app/routes/news.js

// Local dependecies
var logger = require('winston');
var client = require('../model/tweeter');
const GoogleNewsRss = require('google-news-rss');
const googleNews = new GoogleNewsRss();

module.exports = function (router) {
    'use strict';
    router.route('/')
        //Post a news by subject
        .post(function (req, res, next) {
            //Using google news search
            googleNews
                .search(req.body.subject)
                .then(function (response) {
                    //Found news
                    if (response.length > 0) {
                        var rand = require('random-seed').create();
                        var randNews = response[Math.floor(rand.random() * response.length)];
                        //Tweet the news
                        client.post('statuses/update', { status: randNews.link }, function (error, tweet, response) {
                            if (error) logger.error("[tweets] " + req.connection.remoteAddress + ": " + error[0].message);
                            else {
                                logger.info(tweet);   // Tweet body. 
                            }
                            res.json(response);  // Raw response object.
                        });
                    }
                    //didnt found news
                    else {
                        res.json({ "statusCode": 200, "body": "news not found" });
                    }
                }

                );
        });
};