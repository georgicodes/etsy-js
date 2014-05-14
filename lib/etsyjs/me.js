(function() {
  var Me,
    __slice = [].slice;

  Me = (function() {
    function Me(client) {
      this.client = client;
    }

    Me.prototype.find = function(_arg, cb) {
      var params, secret, token, _ref;
      token = _arg.token, secret = _arg.secret;
      params = {};
      return (_ref = this.client).getAuthenticated.apply(_ref, ["/users/__SELF__", token, secret].concat(__slice.call(params), [function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Find authenticated user error'));
        } else {
          return cb(null, body, headers);
        }
      }]));
    };

    return Me;

  })();

  module.exports = Me;

}).call(this);
