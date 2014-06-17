(function() {
  var Shop,
    __slice = [].slice;

  Shop = (function() {
    function Shop(shopId, client) {
      this.shopId = shopId;
      this.client = client;
    }

    Shop.prototype.find = function(cb) {
      return this.client.get("/shops/" + this.shopId, function(err, status, body, headers) {
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

    Shop.prototype.featuredListings = function(_arg, cb) {
      var limit, offset, params, secret, token, _ref;
      token = _arg.token, secret = _arg.secret, limit = _arg.limit, offset = _arg.offset;
      params = {};
      if (limit != null) {
        params.limit = limit;
      }
      if (offset != null) {
        params.offset = offset;
      }
      return (_ref = this.client).get.apply(_ref, ["/shops/" + this.shopId + "/listings/featured", token, secret].concat(__slice.call(params), [function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Get featured listings error'));
        } else {
          return cb(null, body, headers);
        }
      }]));
    };

    return Shop;

  })();

  module.exports = Shop;

}).call(this);
