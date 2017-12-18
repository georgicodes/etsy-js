(function() {
  var Search;

  Search = (function() {
    var responseHandler;

    function Search(client) {
      this.client = client;
    }

    responseHandler = function(cb, errorMessage) {
      return function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error(errorMessage));
        } else {
          return cb(null, body, headers);
        }
      };
    };

    Search.prototype.findAllUsers = function(params, cb) {
      return this.client.get("/users", params, responseHandler(cb, 'Search users error'));
    };

    Search.prototype.findAllListings = function(params, cb) {
      return this.client.get("/listings", params, responseHandler(cb, 'Search listings error'));
    };

    Search.prototype.findListingByIds = function(ids, params, cb) {
      var uriParam;
      uriParam = Array.isArray(ids) ? ids.join(',') : ids;
      return this.client.get("/listings/" + uriParam, params, responseHandler(cb, 'Search listings error'));
    };

    return Search;

  })();

  module.exports = Search;

}).call(this);
