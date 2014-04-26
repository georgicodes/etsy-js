var etsyjs = require('./lib/etsyjs');

var client = etsyjs.client(process.env.ETSY_API_KEY);

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
var etsySearch = client.search();
//var etsyAddress = client.address('georgiknox');
var etsyShop = client.shop('TingBridal');

etsyShop.getShop(callback);
//etsyAddress.findAllUserAddresses(callback);
//etsyUser.getProfile(callback);
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