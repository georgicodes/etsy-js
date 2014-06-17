(function() {
  var Search;

  Search = (function() {
    function Search(client) {
      this.client = client;
    }

    Search.prototype.findAllUsers = function(params, cb) {
      return this.client.get("/users", params, function(err, status, body, headers) {
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
