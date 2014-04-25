(function() {
  var Client, Search, User, request, url,
    __slice = [].slice;

  request = require('request');

  url = require('url');

  User = require('./user');

  Search = require('./search');

  Client = (function() {
    function Client(apiKey, options) {
      this.apiKey = apiKey;
      this.options = options;
      this.request = this.options && this.options.request || request;
    }

    Client.prototype.user = function(login) {
      return new User(login, this);
    };

    Client.prototype.search = function() {
      return new Search(this);
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
        if (pageOrQuery != null) {
          query.page = pageOrQuery;
        }
      }
      query.api_key = this.apiKey;
      console.log('buildUrl');
      console.log(query);
      _url = url.format({
        protocol: "https:",
        hostname: "openapi.etsy.com",
        pathname: "/v2" + path,
        query: query
      });
      console.log("built url: " + _url);
      return _url;
    };

    Client.prototype.errorHandle = function(res, body, callback) {
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
          return _this.errorHandle(res, body, callback);
        };
      })(this));
    };

    return Client;

  })();

  module.exports = function(apiKey, options) {
    return new Client(apiKey, options);
  };

}).call(this);
