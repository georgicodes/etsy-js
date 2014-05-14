(function() {
  var Shop;

  Shop = (function() {
    function Shop(shopId, client) {
      this.shopId = shopId;
      this.client = client;
    }

    Shop.prototype.find = function(_arg, cb) {
      var secret, token;
      token = _arg.token, secret = _arg.secret;
      return this.client.get("/shops/" + this.shopId, token, secret, function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Get shop error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    Shop.prototype.listings = function(_arg, cb) {
      var secret, token;
      token = _arg.token, secret = _arg.secret;
      return this.client.get("/shops/" + this.shopId + "/listings", token, secret, function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Get shop listings error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    return Shop;

  })();

  module.exports = Shop;

}).call(this);
