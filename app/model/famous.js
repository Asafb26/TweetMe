// app/models/famous.js

var config = require('nconf');
var unirest = require('unirest');
function Famous() {
    this.doFamous = function (category, callback) {
        unirest.get("https://andruxnet-random-famous-quotes.p.mashape.com/?cat="+category+"&count=1")
            .header("X-Mashape-Key", config.get('X_MASHAPE_KEY'))
            .header("X-Mashape-Host", "andruxnet-random-famous-quotes.p.mashape.com")
            .end(function (result) {
                callback(result.status, result.headers, result.body);
            });
    }
}

module.exports = new Famous();