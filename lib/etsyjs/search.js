(function() {
  var Search;

  Search = (function() {
    function Search(client) {
      this.client = client;
    }
    
    var responseHandler = function(cb, error_message) {
      return function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error(error_message));
        } else {
          return cb(null, body, headers);
        }
      };
    };

    Search.prototype.findAllUsers = function(params, cb) {
      return this.client.get("/users", params, responseHandler(cb, 'Search users error'));
    };

    Search.prototype.findAllListings = function(params, cb) {
      return this.client.get("/listings/active", params, responseHandler(cb, 'Search listings error'));
    };

    Search.prototype.findListingByIds = function(ids, params, cb) {
      return this.client.get("/listings/"+ids.join(','), params, responseHandler(cb, 'Search listings error'));
    };

    return Search;

  })();

  module.exports = Search;

}).call(this);
