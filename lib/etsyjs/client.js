(function() {
  var Category, Client, Listing, OAuth, Search, Shop, User, request, url,
    __slice = [].slice;

  request = require('request');

  url = require('url');

  OAuth = require('OAuth');

  User = require('./user');

  Category = require('./category');

  Shop = require('./shop');

  Search = require('./search');

  Listing = require('./listing');

  Client = (function() {
    function Client(options) {
      this.options = options;
      this.apiKey = this.options.key;
      this.apiSecret = this.options.secret;
      this.callbackURL = this.options.callbackURL;
      this.request = request;
    }

    Client.prototype.user = function() {
      return new User(this);
    };

    Client.prototype.category = function(tag) {
      return new Category(tag, this);
    };

    Client.prototype.shop = function(shopId) {
      return new Shop(shopId, this);
    };

    Client.prototype.search = function() {
      return new Search(this);
    };

    Client.prototype.listing = function() {
      return new Listing(listingId, this);
    };

    Client.prototype.buildUrl = function(path, pageOrQuery) {
      var query, _url;
      if (path == null) {
        path = '/';
      }
      if (pageOrQuery == null) {
        pageOrQuery = null;
      }
      if ((pageOrQuery != null) && typeof pageOrQuery === 'object') {
        query = pageOrQuery;
      } else {
        query = {};
      }
      if ((this.apiKey != null) && (this.apiSecret == null)) {
        query.api_key = this.apiKey;
      }
      _url = url.format({
        protocol: "https:",
        hostname: "openapi.etsy.com",
        pathname: "/v2" + path,
        query: query
      });
      console.log("built url: " + _url);
      return _url;
    };

    Client.prototype.handleResponse = function(res, body, callback) {
      var err, _ref;
      if (Math.floor(res.statusCode / 100) === 5) {
        return callback(new HttpError('Error ' + res.statusCode, res.statusCode, res.headers));
      }
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body || '{}');
        } catch (_error) {
          err = _error;
          return callback(err);
        }
      }
      if (body.message && ((_ref = res.statusCode) === 400 || _ref === 401 || _ref === 403 || _ref === 404 || _ref === 410 || _ref === 422)) {
        return callback(new HttpError(body.message, res.statusCode, res.headers));
      }
      return callback(null, res.statusCode, body, res.headers);
    };

    Client.prototype.get = function() {
      var callback, params, path, _i;
      path = arguments[0], params = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), callback = arguments[_i++];
      return this.request({
        uri: this.buildUrl.apply(this, [path].concat(__slice.call(params))),
        method: 'GET'
      }, (function(_this) {
        return function(err, res, body) {
          if (err) {
            return callback(err);
          }
          return _this.handleResponse(res, body, callback);
        };
      })(this));
    };

    Client.prototype.getAuthenticated = function() {
      var callback, params, path, secret, token, _i;
      path = arguments[0], token = arguments[1], secret = arguments[2], params = 5 <= arguments.length ? __slice.call(arguments, 3, _i = arguments.length - 1) : (_i = 3, []), callback = arguments[_i++];
      url = this.buildUrl.apply(this, [path].concat(__slice.call(params)));
      console.log("==***===");
      console.log(url);
      return this.etsyOAuth.get(url, token, secret, (function(_this) {
        return function(err, data, res) {
          if (err) {
            return callback(err);
          }
          console.log(data);
          console.log('**');
          console.log(res);
          return _this.handleResponse(res, data, callback);
        };
      })(this));
    };

    Client.prototype.requestToken = function(callback) {
      return this.etsyOAuth.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret) {
        var auth, loginUrl;
        if (err) {
          return callback(err);
        }
        console.log("requestToken");
        console.log(arguments);
        loginUrl = arguments[3].login_url;
        auth = {
          token: oauth_token,
          tokenSecret: oauth_token_secret,
          loginUrl: loginUrl
        };
        return callback(null, auth);
      });
    };

    Client.prototype.accessToken = function(token, secret, verifier, callback) {
      return this.etsyOAuth.getOAuthAccessToken(token, secret, verifier, function(err, oauth_access_token, oauth_access_token_secret, results) {
        var accessToken;
        console.log('==>Get the access token');
        console.log(oauth_access_token);
        console.log(oauth_access_token_secret);
        accessToken = {
          token: oauth_access_token,
          tokenSecret: oauth_access_token_secret
        };
        return callback(null, accessToken);
      });
    };

    Client.prototype.etsyOAuth = new OAuth.OAuth('https://openapi.etsy.com/v2/oauth/request_token?scope=email_r%20profile_r', 'https://openapi.etsy.com/v2/oauth/access_token', 'cndq8yyle7c6ssplz81bf4od', '89fq6biy8w', '1.0', 'http://localhost:3000/authorise', 'HMAC-SHA1');

    return Client;

  })();

  module.exports = function(apiKey, options) {
    return new Client(apiKey, options);
  };

}).call(this);
