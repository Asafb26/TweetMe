// app/routes/tweets.js

// Local dependecies
var Twitter = require('twitter');
var logger = require('winston');
var ipLocation = require('ip-location')
var client = require('../model/tweeter');
var weather = require('weather-js');

module.exports = function (router) {
    'use strict';
    router.route('/')
        .post(function (req, res, next) {
            var clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            clientIp = clientIp.replace(/^.*:/, '');
            ipLocation(clientIp)
                .then(function (data) {
                    weather.find({ search: data.city, degreeType: 'C' }, function (err, result) {
                        if (err) res.json({ "statusCode": 200, "body": "city not found" });
                        else {
                            // Create new tweet
                            client.post('statuses/update', { status: "It's " + new Date().toISOString().replace(/^.*T/, '').replace(/\..+/, '') + " in " + result[0].location.name + " and the temperature is " + result[0].current.temperature + result[0].location.degreetype }, function (error, tweet, response) {
                                if (error) logger.error("[tweets] " + req.connection.remoteAddress + ": " + error[0].message);
                                else {
                                    logger.info(tweet);   // Tweet body. 
                                }
                                res.json(response);  // Raw response object.
                            });
                        }
                    });
                })
                .catch(function (err) {
                    res.json({ "statusCode": 200, "body": "ip location not found" });
                })
        });
};