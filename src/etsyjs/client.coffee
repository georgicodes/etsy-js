# Required modules
request = require 'request'
url = require 'url'

User = require './user'
Search = require './search'

class Client

  constructor: (@apiKey, @options) ->
    @request = @options and @options.request or request

  user: (login) ->
    new User(login, @)

  search: ->
    new Search(@)

  buildUrl: (path = '/', pageOrQuery = null) ->
    if pageOrQuery? and typeof pageOrQuery == 'object'
      query = pageOrQuery
    else
      query = {}
      query.page = pageOrQuery if pageOrQuery?

    query.api_key = @apiKey  #TODO: implement authenticated requests

    _url = url.format
      protocol: "https:"
      hostname: "openapi.etsy.com"
      pathname: "/v2" + path
      query: query

    console.log("built url: " + _url)
    return _url

  errorHandle: (res, body, callback) ->
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
      uri: @buildUrl path, params...
      method: 'GET'
    ), (err, res, body) =>
      return callback(err) if err
      @errorHandle res, body, callback

module.exports = (apiKey, options) ->
  new Client(apiKey, options)