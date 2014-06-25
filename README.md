etsy-js
=======

etsy-js is an asynchronous nodeJS wrapper for the etsy v2 api.

# Installation
Install the latest stable version
```
$ npm install etsy-js
```

Bleeding edge version
```
$ git clone https://github.com/GeorgiCodes/etsy-js.git
$ cd etsy-js
$ npm install
```

# Usage

## Public Mode
The Etsy API has two modes: public, and authenticated. Public mode only requires an API key (available from http://developer.etsy.com ).

```js
var etsyjs = require('etsy-js');
var client = etsyjs.client('your_api_key');

// direct API calls (GET / PUT / POST / DELETE)
client.get('/users/sparkleprincess', {}, function (err, status, body, headers) {
  console.log(body); //json object
});

// or you can use some convenience methods
var etsyUser = client.user('sparkleprincess');
var etsySearch = client.search();
var etsyShop = client.shop('shopALot');

etsyUser.find(function(err, body, headers) {
  console.log(body); //json object
});
```
You can make any non-authenticated calls to the API that you need.

## Authenticated Mode
The Etsy API has support for both retrieval of extended information and write support for authenticated users. Authentication can be performed from within a web application.

In authenticated mode, you need to set a client, secret and callbackURL.
```js
var etsyjs = require('etsy-js');

var client = etsyjs.client({
  key: 'key',
  secret: 'secret',
  callbackURL: 'http://localhost:3000/authorise'
});
```

In this mode, you'll need to store the request token and secret before redirecting to the verification URL.
A simple example in coffeescript using Express and Express Sessions:
```js
express = require('express')
session = require('express-session')
cookieParser = require('cookie-parser')
url = require('url')
etsyjs = require('etsy-js')

# instantiate client with key and secret and set callback url
client = etsyjs.client
  key: nconf.get('key')
  secret: nconf.get('secret')
  callbackURL: 'http://localhost:3000/authorise'

app = express()
app.use(cookieParser('secEtsy'))
app.use(session())

app.get '/', (req, res) ->
  client.requestToken (err, response) ->
    return console.log err if err
    req.session.token = response.token
    req.session.sec = response.tokenSecret
    res.redirect response.loginUrl

app.get '/authorise', (req, res) ->
  # parse the query string for OAuth verifier
  query = url.parse(req.url, true).query;
  verifier = query.oauth_verifier

  # final part of OAuth dance, request access token and secret with given verifier
  client.accessToken req.session.token, req.session.sec, verifier, (err, response) ->
    # update our session with OAuth token and secret
    req.session.token = response.token
    req.session.sec = response.tokenSecret
    res.redirect '/find'

app.get '/find', (req, res) ->
  # we now have OAuth credentials for this session and can perform authenticated requests
  client.auth(req.session.token, req.session.sec).user("etsyjs").find (err, body, headers) ->
    console.log err if err
    console.dir(body) if body
    res.send body.results[0] if body

server = app.listen 3000, ->
  console.log 'Listening on port %d', server.address().port
```
## API Callback Strucutre

All the callbacks fwill take first an error argument, then a data argument, like this:
```js
etsyUser.find(function(err, body, headers) {
  console.log("error: " + err);
  console.log("data: " + body);
  console.log("headers:" + headers);
});
```

## Pagination
Pagination is supported, simply pass through params as follows:

```js
var params = {
  keywords: "rainbow"
  offset: 1,
  limit: 25
};

client.search().findAllUsers(params, function(err, body, headers) {
  console.log("data: " + body);
});
```

## Etsy authenticated user api

FILL ME IN with more examples

##### Get information about the user (GET /user)
```js
etsyUser.find(callback); //json
```

# TODO
* integrate with travis properly
* pass in scope?
* Rate limiting helper method
* More helper methods!!
* Flesh out me.coffee (should just call user with __SELF__) with tests
* use logging not console

# Development

## Running the tests
```js
$ grunt test
```

# Contributions

Thanks to the ruby etsy api wrapper as I used their fixture tests data for the etsy-js tests and README outline.
Thanks to octonode for the inspiration to make this API in coffeescript.
