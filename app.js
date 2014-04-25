var etsyjs = require('./lib/etsyjs');

var client = etsyjs.client(process.env.ETSY_API_KEY);

client.get('/users/georgiknox', {}, function (err, status, body, headers) {
    console.log(body); //json object
});

client.get('/users/georgiknox/profile', {}, function (err, status, body, headers) {
    console.log(body); //json object
});