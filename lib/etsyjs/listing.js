(function() {
  var Listing,
    __slice = [].slice;

  Listing = (function() {
    function Listing(listingId, client) {
      this.listingId = listingId;
      this.client = client;
    }

    Listing.prototype.find = function(cb) {
      return this.client.get("/listings/" + this.listingId, function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Get listings error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    Listing.prototype.active = function() {
      var cb, params, _i, _ref;
      params = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), cb = arguments[_i++];
      return (_ref = this.client).get.apply(_ref, ["/listings/active"].concat(__slice.call(params), [function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Get active listings error'));
        } else {
          return cb(null, body, headers);
        }
      }]));
    };

    Listing.prototype.trending = function() {
      var cb, params, _i, _ref;
      params = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), cb = arguments[_i++];
      return (_ref = this.client).get.apply(_ref, ["/listings/trending"].concat(__slice.call(params), [function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Get trending listings error'));
        } else {
          return cb(null, body, headers);
        }
      }]));
    };

    Listing.prototype.interesting = function() {
      var cb, params, _i, _ref;
      params = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), cb = arguments[_i++];
      return (_ref = this.client).get.apply(_ref, ["/listings/interesting"].concat(__slice.call(params), [function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Get interesting listings error'));
        } else {
          return cb(null, body, headers);
        }
      }]));
    };

    return Listing;

  })();

  module.exports = Listing;

}).call(this);
