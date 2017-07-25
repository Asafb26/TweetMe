// app/routes/yoda.js

// Local dependecies
var logger = require('winston');
var client = require('../model/tweeter');
var yoda = require('../model/yoda');

module.exports = function (router) {
    'use strict';
    router.route('/')
        .post(function (req, res, next) {
            //Generate a yoda quote based on user message
            yoda.doYoda(req.body.message, function (status, header, body) {
                if (status == 200) {
                    // Create new tweet
                    client.post('statuses/update', { status: body }, function (error, tweet, response) {
                        if (error) logger.error("[tweets] " + req.connection.remoteAddress + ": " + error[0].message);
                        else {
                            logger.info(tweet);   // Tweet body. 
                        }
                        res.json(response);  // Raw response object.
                    });
                }
                //error in yoda api
                else {
                    res.json({ "statusCode": status, "body": "an error occurred" });
                }
            })

        });
};