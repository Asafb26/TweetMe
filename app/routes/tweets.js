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

module.exports = function(router) {
  'use strict';
  // This will handle the url calls for /tweets/:user_id
  router.route('/:tweetId')
  .get(function(req, res, next) {
    // Return tweet
    logger.info(req);
  }) 
  .put(function(req, res, next) {
    // Update tweet
  })
  .patch(function(req, res,next) {
    // Patch
  })
  .delete(function(req, res, next) {
    // Delete record
  }); 

  router.route('/')
  .get(function(req, res, next) {
    client.get('search/tweets', {q: req.query.q}, function(error, tweets, response) {
      if(error) logger.error("[tweets] " + req.connection.remoteAddress + ": " + error[0].message);
      else{
        logger.info(tweets);   // Tweet body. 
      }
      res.json(tweets.statuses);
    });
  }).post(function(req, res, next) {
    // Create new tweet
    client.post('statuses/update', {status: req.body.message}, function(error, tweet, response) {
      if(error) logger.error("[tweets] " + req.connection.remoteAddress + ": " + error[0].message);
      else{
        logger.info(tweet);   // Tweet body. 
      }
      res.json(response);  // Raw response object.
    });
  });
};