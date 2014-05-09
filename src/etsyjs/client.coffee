# Required modules
request = require 'request'
url = require 'url'
OAuth = require('OAuth')

#Auth = require './auth'
User = require './user'
Category = require './category'
Shop = require './shop'
Search = require './search'
Listing = require './listing'

class Client

  constructor: (@options) ->
    @apiKey = @options.key
    @apiSecret = @options.secret
    @callbackURL = @options.callbackURL
    @request = request

  user:  ->
    new User(@)

  category: (tag) ->
    new Category(tag, @)

  shop: (shopId) ->
    new Shop(shopId, @)

  search: ->
    new Search(@)

  listing: ->
    new Listing(listingId, @)

  buildUrl: (path = '/', pageOrQuery = null) ->
    if pageOrQuery? and typeof pageOrQuery == 'object'
      query = pageOrQuery
    else
      query = {}

    query.api_key = @apiKey if @apiKey? && not @apiSecret?

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


  getAuthenticated: (path, token, secret, params..., callback) ->
    url = @buildUrl path, params...
    console.log "==***==="
    console.log url
    @etsyOAuth.get url, token, secret, (err, data, res) =>
      return callback(err) if err
      console.log data
      @handleResponse res, data, callback


  requestToken: (callback) ->
    @etsyOAuth.getOAuthRequestToken (err, oauth_token, oauth_token_secret) ->
      return callback(err) if err
      console.log "requestToken"
      console.log arguments
      loginUrl = arguments[3].login_url
      auth =
        token: oauth_token
        tokenSecret: oauth_token_secret
        loginUrl: loginUrl
      callback null, auth

  accessToken: (token, secret, verifier, callback) ->
    @etsyOAuth.getOAuthAccessToken token, secret, verifier, (err, oauth_access_token, oauth_access_token_secret, results) ->
      console.log('==>Get the access token')
      console.log oauth_access_token
      console.log oauth_access_token_secret
      accessToken =
        token: oauth_access_token
        tokenSecret: oauth_access_token_secret

      callback null, accessToken

  etsyOAuth: new OAuth.OAuth(
    'https://openapi.etsy.com/v2/oauth/request_token?scope=email_r%20profile_r',
    'https://openapi.etsy.com/v2/oauth/access_token',
    'cndq8yyle7c6ssplz81bf4od',
    '89fq6biy8w',
    '1.0',
    'http://localhost:3000/authorise',
    'HMAC-SHA1'
  )


module.exports = (apiKey, options) ->
  new Client(apiKey, options)