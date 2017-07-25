// app/routes/text.js

// Local dependecies
var logger = require('winston');
var client = require('../model/tweeter');

module.exports = function (router) {
  'use strict';
  router.route('/')
    //Search for a tweet
    .get(function (req, res, next) {
      client.get('search/tweets', { q: req.query.q }, function (error, tweets, response) {
        if (error) logger.error("[tweets] " + req.connection.remoteAddress + ": " + error[0].message);
        else {
          logger.info(tweets);   // Tweet body. 
        }
        res.json(tweets.statuses);
      });
    }).post(function (req, res, next) {
      // Create new tweet
      client.post('statuses/update', { status: req.body.message }, function (error, tweet, response) {
        if (error) logger.error("[tweets] " + req.connection.remoteAddress + ": " + error[0].message);
        else {
          logger.info(tweet);   // Tweet body. 
        }
        res.json(response);  // Raw response object.
      });
    });
};