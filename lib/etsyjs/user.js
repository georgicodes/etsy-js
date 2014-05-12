(function() {
  var User,
    __slice = [].slice;

  User = (function() {
    function User(userId, client) {
      this.userId = userId;
      this.client = client;
    }

    User.prototype.find = function(_arg, cb) {
      var params, secret, token, _ref;
      token = _arg.token, secret = _arg.secret;
      params = {};
      return (_ref = this.client).get.apply(_ref, ["/users/" + this.userId, token, secret].concat(__slice.call(params), [function(err, status, body, headers) {
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

    User.prototype.findAllUserAddresses = function() {
      var cb, params, _i, _ref;
      params = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), cb = arguments[_i++];
      return (_ref = this.client).get.apply(_ref, ["/users/" + this.userId + "/addresses"].concat(__slice.call(params), [function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Final all user addresses error'));
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
        } else {
          return cb(null, body, headers);
        }
      });
    };

    User.prototype.getCirclesContainingUser = function(_arg, cb) {
      var limit, offset, params, secret, token, _ref;
      token = _arg.token, secret = _arg.secret, limit = _arg.limit, offset = _arg.offset;
      params = {};
      if (limit != null) {
        params.limit = limit;
      }
      if (offset != null) {
        params.offset = offset;
      }
      console.log(params);
      return (_ref = this.client).get.apply(_ref, ["/users/" + this.userId + "/circles", token, secret].concat(__slice.call(params), [function(err, status, body, headers) {
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
