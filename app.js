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
    console.log(body); //json object
};

var etsyUser = client.user('georgiknox');
var etsySearch = client.search();


//etsyUser.getUser(callback);
//etsyUser.getUser(callback);
etsySearch.findAllUsers({keywords: 'dog,cat'}, callback);