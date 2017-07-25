# TweetMe
#### "TweetMe" Is a 3rd party framework for Tweeter communication using REST architecture over Node.js

#### <p style='color:red'>TweetMe web service currently deployed to heroku under the url:                         http://tweetmeapi.herokuapp.com</p>


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
