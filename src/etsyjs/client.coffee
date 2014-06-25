# Required modules
request = require 'request'
OAuth = require 'OAuth'
util = require 'util'

User = require './user'
Me = require './me'
Category = require './category'
Shop = require './shop'
Search = require './search'
Listing = require './listing'
Address = require './address'

# Specialized error
class HttpError extends Error
  constructor: (@message, @statusCode, @headers) ->

class Client
  constructor: (@options) ->
    @apiKey = @options.key
    @apiSecret = @options.secret
    @callbackURL = @options.callbackURL
    @request = request
    @etsyOAuth = new OAuth.OAuth(
      'https://openapi.etsy.com/v2/oauth/request_token?scope=email_r%20profile_r%20profile_w%20address_r%20address_w',
      'https://openapi.etsy.com/v2/oauth/access_token',
      "#{@apiKey}",
      "#{@apiSecret}",
      '1.0',
      "#{@callbackURL}",
      'HMAC-SHA1'
    )

  # nice helper method to set token and secret for each method call
  # client().auth('myToken', 'mySecret').me().find()
  auth: (token, secret) ->
    @authenticatedToken = token
    @authenticatedSecret = secret
    return this

  me: ->
    new Me(@)

  user: (userId) ->
    new User(userId, @)

  category: (tag) ->
    new Category(tag, @)

  shop: (shopId) ->
    new Shop(shopId, @)

  search: ->
    new Search(@)

  listing: (listingId) ->
    new Listing(listingId, @)

  address: (userId) ->
    new Address(userId, @)

  buildUrl: (path = '/', pageOrQuery = null) ->
    if pageOrQuery? and typeof pageOrQuery == 'object'
      query = pageOrQuery
      query.api_key = @apiKey if @apiKey? && not @apiSecret?
    else
      query = {}

    query.api_key = @apiKey if @apiKey? && not @apiSecret?
    _url = require('url').format
      protocol: "https:"
      hostname: "openapi.etsy.com"
      pathname: "/v2#{path}"
      query: query

    console.dir "API URL is #{_url} "
    return _url

  handleResponse: (res, body, callback)->
    return callback(new HttpError('Error ' + res.statusCode, res.statusCode,
      res.headers)) if Math.floor(res.statusCode / 100) is 5
    if typeof body == 'string'
      try
        body = JSON.parse(body || '{}')
      catch err
        console.log "Error parsing response: #{body}"
        return callback(err)
    return callback(new HttpError(body.message, res.statusCode,
      res.headers)) if body.message and res.statusCode in [400, 401, 403, 404, 410, 422]

#    console.log util.inspect body.results
    callback null, res.statusCode, body, res.headers

  # api GET requests
  get: (path, params..., callback) ->
    console.log "==> Client get request with params #{params}"
    if @authenticatedToken? and @authenticatedSecret?
      @getAuthenticated path, params..., callback
    else
      @getUnauthenticated path, params..., callback

  # api PUT requests
  put: (path, content, callback) ->
    url = @buildUrl path
    console.log "==> Perform PUT request on #{url} with #{JSON.stringify content}"
    @etsyOAuth.put url, @authenticatedToken, @authenticatedSecret, content,  (err, data, res) =>
      return callback(err) if err
      @handleResponse res, data, callback

  # api POST requests
  post: (path, content, callback) ->
    url = @buildUrl path
    console.log "==> Perform POST request on #{url} with #{JSON.stringify content}"
    @etsyOAuth.post url, @authenticatedToken, @authenticatedSecret, content,  (err, data, res) =>
      return callback(err) if err
      @handleResponse res, data, callback

  # api DELETE requests
  delete: (path, callback) ->
    url = @buildUrl path
    console.log "==> Perform DELETE request on #{url}"
    @etsyOAuth.delete url, @authenticatedToken, @authenticatedSecret, (err, data, res) =>
      return callback(err) if err
      @handleResponse res, data, callback

  getUnauthenticated: (path, params..., callback) ->
    console.log "==> Perform unauthenticated GET request"
    @request (
      uri: @buildUrl path, params...
      method: 'GET'
    ), (err, res, body) =>
      return callback(err) if err
      @handleResponse res, body, callback

  getAuthenticated: (path, params..., callback) ->
    url = @buildUrl path, params...
    console.log "==> Perform authenticated GET request on #{url}"
    @etsyOAuth.get url, @authenticatedToken, @authenticatedSecret, (err, data, res) =>
      return callback(err) if err
      @handleResponse res, data, callback

  requestToken: (callback) ->
    @etsyOAuth.getOAuthRequestToken (err, oauth_token, oauth_token_secret) ->
      console.log "==> Retrieving the request token"
      return callback(err) if err
      loginUrl = arguments[3].login_url
      auth =
        token: oauth_token
        tokenSecret: oauth_token_secret
        loginUrl: loginUrl
      callback null, auth

  accessToken: (token, secret, verifier, callback) ->
    @etsyOAuth.getOAuthAccessToken token, secret, verifier, (err, oauth_access_token, oauth_access_token_secret, results) ->
      console.log "==> Retrieving the access token"
      accessToken =
        token: oauth_access_token
        tokenSecret: oauth_access_token_secret

      callback null, accessToken

module.exports = (apiKey, options) ->
  new Client(apiKey, options)
