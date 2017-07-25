// app/routes/famous.js

// Local dependecies
var logger = require('winston');
var client = require('../model/tweeter');
var famous = require('../model/famous');

module.exports = function (router) {
    'use strict';
    router.route('/')
        .post(function (req, res, next) {
            //Generate a famous quote
            famous.doFamous(req.body.subject, function (status, header, body) {
                if (status == 200) {
                    // Create new tweet
                    client.post('statuses/update', { status: "\"" + body.quote + "\" - " + body.author }, function (error, tweet, response) {
                        if (error) logger.error("[tweets] " + req.connection.remoteAddress + ": " + error[0].message);
                        else {
                            logger.info(tweet);   // Tweet body. 
                        }
                        res.json(response);  // Raw response object.
                    });
                }
                //error in quote api
                else {
                    res.json({ "statusCode": status, "body": "an error occurred" });
                }
            })

        });
};