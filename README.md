#etsyJS

etsyJS is a library for nodejs to access the etsy v2 api

# Installation
'''js
npm install etsyJS
'''

# Usage
'''js
var etsyjs = require('etsyjs');

// Then we instanciate a client with or without a token (as show in a later section)

var etsyUser = client.user('sparkleprincess');
var etsySearch = client.search();
var etsyShop = client.shop('shopALot');
'''

## Public Mode
The Etsy API has two modes: public, and authenticated. Public mode only requires an API key (available from http://developer.etsy.com ):

'''js
var client = etsyjs.client('your_api_key');

client.get('/users/sparkleprincess', {}, function (err, status, body, headers) {
  console.log(body); //json object
});
'''
From there, you can make any non-authenticated calls to the API that you need.

## Authenticated Mode
The Etsy API has support for both retrieval of extended information and write support for authenticated users. Authentication can either be performed from the console or from within a Ruby web application.

### Console
'''js
var client = etsyjs.client({
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret'
});

'''