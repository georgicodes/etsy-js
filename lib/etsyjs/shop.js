(function() {
  var Shop;

  Shop = (function() {
    function Shop(shopId, client) {
      this.shopId = shopId;
      this.client = client;
    }

    Shop.prototype.getShop = function(cb) {
      return this.client.get("/shops/" + this.shopId, function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Get user error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    return Shop;

  })();

  module.exports = Shop;

}).call(this);