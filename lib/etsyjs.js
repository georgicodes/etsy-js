(function() {
  var etsyjs;

  etsyjs = module.exports = {
    client: require('./etsyjs/client'),
    shop: require('./etsyjs/shop'),
    category: require('./etsyjs/category'),
    user: require('./etsyjs/user'),
    search: require('./etsyjs/search')
  };

}).call(this);
