(function() {
  var User;

  User = (function() {
    function User(login, client) {
      this.login = login;
      this.client = client;
    }

    User.prototype.info = function(cb) {
      return this.client.get("/users/" + this.login, function(err, status, body, headers) {
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
