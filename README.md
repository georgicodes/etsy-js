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
An example of accessing the API via an express app, you need to set a client, secret and callbackURL

```

```