# Requiring modules
request = require 'request'
url = require 'url'
extend    = require 'deep-extend'

User = require './user'

class Client

  constructor: (@apiKey, @options) ->
    @request = @options and @options.request or request

  user:(login) ->
    new User(login, @)

  buildUrl: (path = '/') ->
    query = {}
    query.api_key = @apiKey

    _url = url.format
      protocol: "https:"
      hostname: "openapi.etsy.com"
      pathname: "/v2" + path
      query: query

    return _url

  errorHandle: (res, body, callback) ->
    # TODO: More detailed HTTP error message
    return callback(new HttpError('Error ' + res.statusCode, res.statusCode,
      res.headers)) if Math.floor(res.statusCode / 100) is 5
    if typeof body == 'string'
      try
        body = JSON.parse(body || '{}')
      catch err
        return callback(err)
    return callback(new HttpError(body.message, res.statusCode,
      res.headers)) if body.message and res.statusCode in [400, 401, 403, 404, 410, 422]
    callback null, res.statusCode, body, res.headers

  get: (path, params..., callback) ->
    @request (
      uri: @buildUrl path
      method: 'GET'
    ), (err, res, body) =>
      return callback(err) if err
      @errorHandle res, body, callback

module.exports = (apiKey, options) ->
  new Client(apiKey, options)