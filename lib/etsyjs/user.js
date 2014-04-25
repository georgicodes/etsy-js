(function() {
  var User;

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
          return cb(new Error('User info error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    User.prototype.getCirclesContainingUser = function(cb) {
      return this.client.get("/users/" + this.userId + "/circles", function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('User info error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    User.prototype.getConnectedUsers = function(cb) {
      return this.client.get("/users/" + this.userId + "/connected_users", function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('User info error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    return User;

  })();

  module.exports = User;

}).call(this);
