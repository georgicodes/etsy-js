util = require('util')

class User
  constructor: (@userId, @client) ->

  # Retrieves a User by id
  # '/users/:user_id' GET
  find: (cb) ->
    @client.get "/users/#{@userId}", (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get user error'))
      else
        cb null, body, headers

  # Retrieves a set of UserAddress objects associated to a User
  # '/users/:user_id/addresses' GET
  addresses: (cb) ->
    @client.get "/users/#{@userId}/addresses", (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Final all user addresses error'))
      else
        cb null, body, headers

  # Returns profile for user
  # /users/:user_id/profile GET
  profile: (cb) ->
    @client.get "/users/#{@userId}/profile", (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get user profile error'))
      else
        cb null, body, headers

  # Returns a list of users who have circled this user
  # /users/:user_id/circles GET
  circles: ({token, secret, limit, offset}, cb) ->
    params = {}
    params.limit = limit if limit?
    params.offset = offset if offset?
    @client.get "/users/#{@userId}/circles", token, secret, params..., (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get circles containing user error'))
      else
        cb null, body, headers

  # Returns a list of users that are in this user's circle
  # /users/:user_id/connected_users GET
  connectedUsers: ({token, secret, limit, offset}, cb) ->
    params = {}
    params.limit = limit if limit?
    params.offset = offset if offset?
    @client.get "/users/#{@userId}/connected_users", token, secret, params..., (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get connected users error'))
      else
        cb null, body, headers

module.exports = User
