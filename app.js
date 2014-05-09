express = require('express')

var etsyjs = require('./lib/etsyjs');

var client = etsyjs.client({
    clientId: 'cndq8yyle7c6ssplz81bf4od',
    secret: 'yjnoedkykc',
    callbackURL: 'http://localhost:3000/authorise'
});

//var client = etsyjs.client(process.env.ETSY_API_KEY);

//client.get('/users/georgiknox', {}, function (err, status, body, headers) {
//    console.log(body); //json object
//});
//
//client.get('/users/georgiknox/profile', {}, function (err, status, body, headers) {
//    console.log(body); //json object
//});

var callback = function (err, body, headers) {
    console.log(err);
    console.log(body); //json object
};

var etsyUser = client.user('georgiknox');
//var etsySearch = client.search();
//var etsyAddress = client.address('georgiknox');
//var etsyShop = client.shop('TingBridal');
//
//client.requestToken(callback);
//etsyShop.getShop(callback);
//etsyAddress.findAllUserAddresses(callback);
etsyUser.getProfile(callback);
//etsyUser.getUser(callback);
//etsySearch.findAllUsers({
//    keywords: 'cat,dog',
//    limit: 90,
//    offset: 30
//}, callback);
//
//etsyUser.getCirclesContainingUser(function onCallback(err, body, headers){
//    console.log(body); //json object
//});
//etsySearch.findAllUsers({keywords: 'dog,cat'}, callback);

//consumer.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret, results ){
//    console.log('==>Get the request token');
//    console.log(arguments);
//});