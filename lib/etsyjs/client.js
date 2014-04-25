(function() {
  var Client, extend, request, url,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  request = require('request');

  url = require('url');

  extend = require('deep-extend');

  Client = (function() {
    function Client(apiKey, options) {
      this.apiKey = apiKey;
      this.options = options;
      this.requestOptions = __bind(this.requestOptions, this);
      this.request = this.options && this.options.request || request;
      this.requestDefaults = {
        headers: {
          'User-Agent': 'octonode/0.3 (https://github.com/pksunkara/octonode) terminal/0.0'
        }
      };
    }

    Client.prototype.buildUrl = function(path) {
      var query, _url;
      if (path == null) {
        path = '/';
      }
      query = {};
      query.api_key = this.apiKey;
      _url = url.format({
        protocol: "https:",
        hostname: "openapi.etsy.com",
        pathname: "/v2" + path,
        query: query
      });
      return _url;
    };

    Client.prototype.requestOptions = function(params1, params2) {
      return extend(this.requestDefaults, params1, params2);
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
      return this.request(this.requestOptions({
        uri: this.buildUrl(path),
        method: 'GET'
      }), (function(_this) {
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
