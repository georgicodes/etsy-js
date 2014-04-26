# Required modules
request = require 'request'
url = require 'url'

User = require './user'
Category = require './category'
Shop = require './shop'
Search = require './search'

class Client

  constructor: (@apiKey, @options) ->
    @request = @options and @options.request or request

  user: (userId) ->
    new User(userId, @)

  category:(tag) ->
    new Category(tag, @)

  shop:(shopId) ->
    new Shop(shopId, @)

  search: ->
    new Search(@)

  buildUrl: (path = '/', pageOrQuery = null) ->
    if pageOrQuery? and typeof pageOrQuery == 'object'
      query = pageOrQuery
    else
      query = {}

    query.api_key = @apiKey if @apiKey? #TODO: implement authenticated requests

    _url = url.format
      protocol: "https:"
      hostname: "openapi.etsy.com"
      pathname: "/v2" + path
      query: query

    console.log("built url: " + _url)
    return _url

  handleResponse: (res, body, callback) ->
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
      @handleResponse res, body, callback

module.exports = (apiKey, options) ->
  new Client(apiKey, options)