(function() {
  var Search;

  Search = (function() {
    function Search(client) {
      this.client = client;
    }

    Search.prototype.findAllUsers = function(_arg, cb) {
      var keywords, limit, offset, params, secret, token;
      token = _arg.token, secret = _arg.secret, keywords = _arg.keywords, limit = _arg.limit, offset = _arg.offset;
      params = {};
      if (keywords != null) {
        params.keywords = keywords;
      }
      if (limit != null) {
        params.limit = limit;
      }
      if (offset != null) {
        params.offset = offset;
      }
      return this.client.get("/users", token, secret, params, function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Search users error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    Search.prototype.findAllListings = function(params, cb) {
      return this.client.get("/listings", params, function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Search listings error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    return Search;

  })();

  module.exports = Search;

}).call(this);
