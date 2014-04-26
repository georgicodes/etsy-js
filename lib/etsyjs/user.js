(function() {
  var User,
    __slice = [].slice;

  User = (function() {
    function User(userId, client) {
      this.userId = userId;
      this.client = client;
    }

    User.prototype.getUser = function(cb) {
      return this.client.get("/users/" + this.userId, function(err, status, body, headers) {
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

    User.prototype.findAllUserAddresses = function() {
      var cb, params, _i, _ref;
      params = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), cb = arguments[_i++];
      return (_ref = this.client).get.apply(_ref, ["/users/" + this.userId + "/addresses"].concat(__slice.call(params), [function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Get user error'));
        } else {
          return cb(null, body, headers);
        }
      }]));
    };

    User.prototype.getProfile = function(cb) {
      var params;
      params = {
        includes: 'Profile'
      };
      return this.client.get("/users/" + this.userId, params, function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Get user profile error'));
        }
      });
    };

    User.prototype.getCirclesContainingUser = function() {
      var cb, params, _i, _ref;
      params = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), cb = arguments[_i++];
      return (_ref = this.client).get.apply(_ref, ["/users/" + this.userId + "/circles"].concat(__slice.call(params), [function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Get circles containing user error'));
        } else {
          return cb(null, body, headers);
        }
      }]));
    };

    User.prototype.getConnectedUsers = function() {
      var cb, params, _i, _ref;
      params = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), cb = arguments[_i++];
      return (_ref = this.client).get.apply(_ref, ["/users/" + this.userId + "/connected_users"].concat(__slice.call(params), [function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Get connected users error'));
        } else {
          return cb(null, body, headers);
        }
      }]));
    };

    return User;

  })();

  module.exports = User;

}).call(this);
