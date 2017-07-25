// app/routes/weather.js

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
            //Determine the location of the client by its ip address
            ipLocation(clientIp)
                .then(function (data) {
                    //Check the weather by the client city
                    weather.find({ search: data.city, degreeType: 'C' }, function (err, result) {
                        if (err) res.json({ "statusCode": 200, "body": "city not found" });
                        else {
                            // Create new tweet
                            client.post('statuses/update', { status: "As of " + result[0].current.observationtime + " today, its " + result[0].current.temperature + result[0].location.degreetype + " in " + result[0].location.name }, function (error, tweet, response) {
                                if (error) logger.error("[tweets] " + req.connection.remoteAddress + ": " + error[0].message);
                                else {
                                    logger.info(tweet);   // Tweet body. 
                                }
                                res.json(response);  // Raw response object.
                            });
                        }
                    });
                })
                //For private ip addresses, cannot found location
                .catch(function (err) {
                    res.json({ "statusCode": 200, "body": "ip location not found" });
                })
        });
};