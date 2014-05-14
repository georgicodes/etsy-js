(function() {
  var Category;

  Category = (function() {
    function Category(tag, client) {
      this.tag = tag;
      this.client = client;
    }

    Category.prototype.find = function(_arg, cb) {
      var secret, token;
      token = _arg.token, secret = _arg.secret;
      return this.client.get("/categories/" + this.tag, token, secret, function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Get categories error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    Category.prototype.topLevelCategories = function(_arg, cb) {
      var secret, token;
      token = _arg.token, secret = _arg.secret;
      return this.client.get("/taxonomy/categories", token, secret, function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Get top level categories error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    return Category;

  })();

  module.exports = Category;

}).call(this);
