etsy-js
=======

etsy-js is an wrapper in nodejs to access the etsy v2 api.

# Installation
Install the latest stable version
```
$ npm install etsy-js
```

Bleeding edge version
```
$ git clone https://github.com/georgiknox/etsy-js.git
$ cd etsy-js
$ npm install
```

# Usage

## Public Mode
The Etsy API has two modes: public, and authenticated. Public mode only requires an API key (available from http://developer.etsy.com ). 

```js
var etsyjs = require('etsyjs');
var client = etsyjs.client('your_api_key');

// direct API calls
client.get('/users/sparkleprincess', {}, function (err, status, body, headers) {
  console.log(body); //json object
});

// or you can use some convenience methods
var etsyUser = client.user('sparkleprincess');
var etsySearch = client.search();
var etsyShop = client.shop('shopALot');
```
From there, you can make any non-authenticated calls to the API that you need.

## Authenticated Mode
The Etsy API has support for both retrieval of extended information and write support for authenticated users. Authentication can either be performed from within a web application.

After you have completed the OAuth process, to use authenticated mode, simply call the `.auth(token,secret)` method after client, then all your calls will be authenticated, in this example its `find`
```
  client.auth(oauthSession.token, oauthSession.secret).user("sparkleprincesspony").find (err, body, headers) ->
    console.log err if err
```

#### Web Application
An coffeescript example of accessing the API using OAuth and an express app. You need to set a client, secret and callbackURL.

```
session = require('express-session')
cookieParser = require('cookie-parser')
url = require('url')
etsyjs = require('etsyjs')

client = etsyjs.client
  key: 'key'
  secret: 'secret'
  callbackURL: 'http://localhost:3000/authorise'

app = express()
app.use(cookieParser('secEtsy'))
app.use(session())

app.get '/', (req, res) ->
  oauthSession = {token: req.session.token, secret: req.session.sec}

  # if we are accessing the API for the first time, then kick off OAuth dance
  if (not oauthSession.token? && not oauthSession.secret?)
    client.requestToken (err, response) ->
      return console.log err if err
      req.session.token = response.token
      req.session.sec = response.tokenSecret
      res.redirect response.loginUrl
  else
    # else if we have OAuth credentials for this session then use them
    client.auth(oauthSession.token, oauthSession.secret).user("sparkleprincesspony").find (err, body, headers) ->
      console.log err if err
      console.dir "Returned result #{body}" if body
      res.send body.results[0] if body

  app.get '/authorise', (req, res) ->
    # parse the query string for OAuth verifier
    query = url.parse(req.url, true).query;
    verifier = query.oauth_verifier
    console.log ("==> with OAuth verifier #{verifier} and token #{req.session.token} and secret #{req.session.sec}")
  
    # final part of OAuth dance, request access token and secret with given verifier
    client.accessToken req.session.token, req.session.sec, verifier, (err, response) ->
      # update our session with OAuth token and secret
      req.session.token = response.token
      req.session.sec = response.tokenSecret
      res.redirect '/'
  
  server = app.listen 3000, ->
    console.log 'Listening on port %d', server.address().port
```

# Development

## Running the tests
```js
$ grunt test
```
