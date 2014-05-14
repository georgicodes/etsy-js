(function() {
  var Listing;

  Listing = (function() {
    function Listing(listingId, client) {
      this.listingId = listingId;
      this.client = client;
    }

    Listing.prototype.find = function(_arg, cb) {
      var secret, token;
      token = _arg.token, secret = _arg.secret;
      return this.client.get("/listings/" + this.listingId, token, secret, function(err, status, body, headers) {
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

    return Listing;

  })();

  module.exports = Listing;

}).call(this);
