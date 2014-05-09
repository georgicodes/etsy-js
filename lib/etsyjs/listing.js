(function() {
  var Listing;

  Listing = (function() {
    function Listing(listingId, client) {
      this.listingId = listingId;
      this.client = client;
    }

    Listing.prototype.findAllImagesById = function() {};

    return Listing;

  })();

  module.exports = Listing;

}).call(this);
