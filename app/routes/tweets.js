// app/routes/tweets.js

// Local dependecies
var config = require('nconf');
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

module.exports = function(router) {
  'use strict';
  // This will handle the url calls for /tweets/:user_id
  router.route('/:userId')
  .get(function(req, res, next) {
    // Return tweet
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
    // Logic for GET /tweets routes
  }).post(function(req, res, next) {
    // Create new tweet
    client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
      if(error) throw error;
      console.log(tweet);  // Tweet body. 
      console.log(response);  // Raw response object.
    });
    console.log(req.body);
    res.json(req.body);
  });
};