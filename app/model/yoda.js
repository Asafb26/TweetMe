// app/models/yoda.js

var config = require('nconf');
var unirest = require('unirest');
function Yoda() {
    this.doYoda = function (message, callback) {
        unirest.get("https://yoda.p.mashape.com/yoda?sentence="+message)
            .header("X-Mashape-Key", config.get('X_MASHAPE_KEY'))
            .header("X-Mashape-Host", "yoda.p.mashape.com")
            .end(function (result) {
                callback(result.status, result.headers, result.body);
            });
    }
}

module.exports = new Yoda();