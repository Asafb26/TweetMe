# TweetMe
#### "TweetMe" Is a 3rd party framework for Tweeter communication using REST architecture over Node.js

- #### TweetMe web service currently deployed to heroku under the url: http://tweetmeapi.herokuapp.com
- #### More info and documentations can found here: https://drive.google.com/open?id=0B3BcAGXdeCtccHluV0pjV0tSZlU


### Usage:
---

## text - post and list a text based tweet
get list of tweets by specific query:
```
http get: api/text/?q=some+query
```
post a new tweet:
```
http post: api/text
http body json: {"message": "YOUR_MESSAGE"}
```

## weather - tweet the weather information in your location
post a new weather tweet:
```
http post: api/weather
```
## photos - tweet a random photo from flickr API that filtered by specific subject
post a new weather tweet:
```
http post: api/photos
http body json: {"subject": "YOUR_SUBJECT"}
```
## news - tweet a random news from google news that filtered by specific subject
post a new weather tweet:
```
http post: api/news
http body json: {"subject": "YOUR_SUBJECT"}
```

## Example (using curl for convience)
news:
```
$curl -H "Content-Type: application/json" -X POST -d "{\"subject\": \"RapidAPI\"}" http://tweetmeapi.herokuapp.com/api/news
```
![alt text](http://i64.tinypic.com/zbxp4.jpg)

weather:
```
$curl -X POST http://tweetmeapi.herokuapp.com/api/weather
```
![alt text](http://i65.tinypic.com/2cyqmhc.jpg)

photos:
```
$curl -H "Content-Type: application/json" -X POST -d "{\"subject\": \"earth\"}" http://tweetmeapi.herokuapp.com/api/photos
```
![alt text](http://i65.tinypic.com/6ejajd.jpg)

## Unit Testing (using Mocha and Chai):
```
$npm test
```
![alt text](http://i67.tinypic.com/rvais5.jpg)
