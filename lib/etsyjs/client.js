(function() {
  var Address, Category, Client, HttpError, Listing, Me, OAuth, Search, Shop, User, request, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  request = require('request');

  OAuth = require('OAuth');

  util = require('util');

  User = require('./user');

  Me = require('./me');

  Category = require('./category');

  Shop = require('./shop');

  Search = require('./search');

  Listing = require('./listing');

  Address = require('./address');

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
      this.etsyOAuth = new OAuth.OAuth('https://openapi.etsy.com/v2/oauth/request_token?scope=email_r%20profile_r%20profile_w%20address_r%20address_w', 'https://openapi.etsy.com/v2/oauth/access_token', "" + this.apiKey, "" + this.apiSecret, '1.0', "" + this.callbackURL, 'HMAC-SHA1');
    }

    Client.prototype.auth = function(token, secret) {
      this.authenticatedToken = token;
      this.authenticatedSecret = secret;
      return this;
    };

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

    Client.prototype.address = function(userId) {
      return new Address(userId, this);
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
        if ((this.apiKey != null) && (this.apiSecret == null)) {
          query.api_key = this.apiKey;
        }
      } else {
        query = {};
      }
      if ((this.apiKey != null) && (this.apiSecret == null)) {
        query.api_key = this.apiKey;
      }
      _url = require('url').format({
        protocol: "https:",
        hostname: "openapi.etsy.com",
        pathname: "/v2" + path,
        query: query
      });
      console.dir("API URL is " + _url + " ");
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
          console.dir("Error parsing response: " + body);
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
      console.dir("==> Client get request with params " + params);
      if ((this.authenticatedToken != null) && (this.authenticatedSecret != null)) {
        return this.getAuthenticated.apply(this, [path].concat(__slice.call(params), [callback]));
      } else {
        return this.getUnauthenticated.apply(this, [path].concat(__slice.call(params), [callback]));
      }
    };

    Client.prototype.put = function(path, content, callback) {
      var url;
      url = this.buildUrl(path);
      console.dir("==> Perform PUT request on " + url + " with " + (JSON.stringify(content)));
      return this.etsyOAuth.put(url, this.authenticatedToken, this.authenticatedSecret, content, (function(_this) {
        return function(err, data, res) {
          if (err) {
            return callback(err);
          }
          return _this.handleResponse(res, data, callback);
        };
      })(this));
    };

    Client.prototype.post = function(path, content, callback) {
      var url;
      url = this.buildUrl(path);
      console.dir("==> Perform POST request on " + url + " with " + (JSON.stringify(content)));
      return this.etsyOAuth.post(url, this.authenticatedToken, this.authenticatedSecret, content, (function(_this) {
        return function(err, data, res) {
          if (err) {
            return callback(err);
          }
          return _this.handleResponse(res, data, callback);
        };
      })(this));
    };

    Client.prototype["delete"] = function(path, callback) {
      var url;
      url = this.buildUrl(path);
      console.dir("==> Perform DELETE request on " + url);
      return this.etsyOAuth["delete"](url, this.authenticatedToken, this.authenticatedSecret, (function(_this) {
        return function(err, data, res) {
          if (err) {
            return callback(err);
          }
          return _this.handleResponse(res, data, callback);
        };
      })(this));
    };

    Client.prototype.getUnauthenticated = function() {
      var callback, params, path, _i;
      path = arguments[0], params = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), callback = arguments[_i++];
      console.dir("==> Perform unauthenticated GET request");
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
      var callback, params, path, url, _i;
      path = arguments[0], params = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), callback = arguments[_i++];
      url = this.buildUrl.apply(this, [path].concat(__slice.call(params)));
      console.dir("==> Perform authenticated GET request on " + url);
      return this.etsyOAuth.get(url, this.authenticatedToken, this.authenticatedSecret, (function(_this) {
        return function(err, data, res) {
          if (err) {
            return callback(err);
          }
          return _this.handleResponse(res, data, callback);
        };
      })(this));
    };

    Client.prototype.requestToken = function(callback) {
      return this.etsyOAuth.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret) {
        var auth, loginUrl;
        console.dir("==> Retrieving the request token");
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
        console.dir("==> Retrieving the access token");
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
