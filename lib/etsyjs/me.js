(function() {
  var Me;

  Me = (function() {
    function Me(client) {
      this.client = client;
    }

    Me.prototype.find = function(cb) {
      return this.client.getAuthenticated("/users/__SELF__", function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Find authenticated user error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    return Me;

  })();

  module.exports = Me;

}).call(this);
