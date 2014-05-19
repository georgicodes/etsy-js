(function() {
  var User, util,
    __slice = [].slice;

  util = require('util');

  User = (function() {
    function User(userId, client) {
      this.userId = userId;
      this.client = client;
    }

    User.prototype.find = function(cb) {
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

    User.prototype.addresses = function(cb) {
      return this.client.get("/users/" + this.userId + "/addresses", function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Final all user addresses error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    User.prototype.profile = function(_arg, cb) {
      var secret, token;
      token = _arg.token, secret = _arg.secret;
      return this.client.get("/users/" + this.userId + "/profile", token, secret, function(err, status, body, headers) {
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

    User.prototype.circles = function(_arg, cb) {
      var limit, offset, params, secret, token, _ref;
      token = _arg.token, secret = _arg.secret, limit = _arg.limit, offset = _arg.offset;
      params = {};
      if (limit != null) {
        params.limit = limit;
      }
      if (offset != null) {
        params.offset = offset;
      }
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

    User.prototype.connectedUsers = function(_arg, cb) {
      var limit, offset, params, secret, token, _ref;
      token = _arg.token, secret = _arg.secret, limit = _arg.limit, offset = _arg.offset;
      params = {};
      if (limit != null) {
        params.limit = limit;
      }
      if (offset != null) {
        params.offset = offset;
      }
      return (_ref = this.client).get.apply(_ref, ["/users/" + this.userId + "/connected_users", token, secret].concat(__slice.call(params), [function(err, status, body, headers) {
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
