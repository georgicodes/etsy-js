#etsyJS

etsyJS is a library for nodejs to access the etsy v2 api

# Installation
Install the latest stable version
```
$ npm install etsyJS
```

Bleeding edge version
```
$ git clone https://github.com/georgiknox/etsyJS.git
$ cd etsyJS
$ npm install
```

# Usage

## Public Mode
The Etsy API has two modes: public, and authenticated. Public mode only requires an API key (available from http://developer.etsy.com ):

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
The Etsy API has support for both retrieval of extended information and write support for authenticated users. Authentication can either be performed from the console or from within a Ruby web application.

### Web Application
An coffeescript example of accessing the API via an express app, you need to set a client, secret and callbackURL

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
    if (not req.session.token? && not req.session.sec?)
      client.requestToken (err, response) ->
        req.session.token = response.token
        req.session.sec = response.tokenSecret
        res.redirect response.loginUrl
    else
      client.user().myself req.session.token, req.session.sec, (err, body, headers) ->
        res.send body.results[0].login_name

app.get '/authorise', (req, res) ->
  query = url.parse(req.url, true).query;
  verifier = query.oauth_verifier
  client.accessToken req.session.token, req.session.sec, verifier, (err, response) ->
    req.session.token = response.token
    req.session.sec = response.tokenSecret
    res.redirect '/'
```

# Development

## Running the tests
```js
$ grunt test
```
