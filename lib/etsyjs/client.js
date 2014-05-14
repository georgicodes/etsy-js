(function() {
  var Category, Client, HttpError, Listing, Me, OAuth, Search, Shop, User, request, url,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  request = require('request');

  url = require('url');

  OAuth = require('OAuth');

  User = require('./user');

  Me = require('./me');

  Category = require('./category');

  Shop = require('./shop');

  Search = require('./search');

  Listing = require('./listing');

  HttpError = (function(_super) {
    __extends(HttpError, _super);

    function HttpError(message, statusCode, headers) {
      this.message = message;
      this.statusCode = statusCode;
      this.headers = headers;
    }

    return HttpError;

  })(Error);

  Client = (function() {
    function Client(options) {
      this.options = options;
      this.apiKey = this.options.key;
      this.apiSecret = this.options.secret;
      this.callbackURL = this.options.callbackURL;
      this.request = request;
      this.etsyOAuth = new OAuth.OAuth('https://openapi.etsy.com/v2/oauth/request_token?scope=email_r%20profile_r%20profile_w%20address_r', 'https://openapi.etsy.com/v2/oauth/access_token', "" + this.apiKey, "" + this.apiSecret, '1.0', "" + this.callbackURL, 'HMAC-SHA1');
    }

    Client.prototype.me = function() {
      return new Me(this);
    };

    Client.prototype.user = function(userId) {
      return new User(userId, this);
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

    Client.prototype.listing = function(listingId) {
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
      console.log("query");
      console.log(pageOrQuery);
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
      console.log("URL: " + _url);
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
      console.log(body);
      return callback(null, res.statusCode, body, res.headers);
    };

    Client.prototype.get = function() {
      var callback, params, path, secret, token, _i;
      path = arguments[0], token = arguments[1], secret = arguments[2], params = 5 <= arguments.length ? __slice.call(arguments, 3, _i = arguments.length - 1) : (_i = 3, []), callback = arguments[_i++];
      console.log("==> Get decider method");
      if ((token != null) && (secret != null)) {
        return this.getAuthenticated.apply(this, [path, token, secret].concat(__slice.call(params), [callback]));
      } else {
        return this.getUnauthenticated.apply(this, [path].concat(__slice.call(params), [callback]));
      }
    };

    Client.prototype.getUnauthenticated = function() {
      var callback, params, path, _i;
      path = arguments[0], params = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), callback = arguments[_i++];
      console.log("==> Perform unauthenticated request");
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
      var callback, params, path, secret, token, _i, _ref;
      path = arguments[0], token = arguments[1], secret = arguments[2], params = 5 <= arguments.length ? __slice.call(arguments, 3, _i = arguments.length - 1) : (_i = 3, []), callback = arguments[_i++];
      url = this.buildUrl.apply(this, [path].concat(__slice.call(params)));
      console.log("==> Perform authenticated request on " + url);
      return (_ref = this.etsyOAuth).get.apply(_ref, [url, token, secret].concat(__slice.call(params), [(function(_this) {
        return function(err, data, res) {
          if (err) {
            return callback(err);
          }
          return _this.handleResponse(res, data, callback);
        };
      })(this)]));
    };

    Client.prototype.requestToken = function(callback) {
      return this.etsyOAuth.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret) {
        var auth, loginUrl;
        console.log('==> Retrieving the request token');
        if (err) {
          return callback(err);
        }
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
        console.log('==> Retrieving the access token');
        accessToken = {
          token: oauth_access_token,
          tokenSecret: oauth_access_token_secret
        };
        return callback(null, accessToken);
      });
    };

    return Client;

  })();

  module.exports = function(apiKey, options) {
    return new Client(apiKey, options);
  };

}).call(this);
