class User

  constructor: (@client) ->

  myself: (token, secret, params..., cb) ->
    @client.getAuthenticated "/users/__SELF__", token, secret, params..., (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Find authenticated user'))
      else
        cb null, body, headers

  # Retrieves a User by id
  # '/users/:user_id' GET
  getUser: (cb) ->
    @client.get "/users/#{@userId}", (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get user error'))
      else
        cb null, body, headers

  # Retrieves a set of UserAddress objects associated to a User
  # '/users/:user_id/addresses' GET
  findAllUserAddresses: (params..., cb) ->
    @client.get "/users/#{@userId}/addresses", params..., (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Final all user addresses error'))
      else
        cb null, body, headers

  getProfile: (cb) ->
    params = {includes: 'Profile'}
    @client.get "/users/#{@userId}", params, (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get user profile error'))
      else
        cb null, body, headers

  # Returns a list of users who have circled this user
  # /users/:user_id/circles GET
  getCirclesContainingUser: (params..., cb) ->
    @client.get "/users/#{@userId}/circles", params..., (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get circles containing user error'))
      else
        cb null, body, headers

  # Returns a list of users that are in this user's circle
  # /users/:user_id/connected_users GET
  getConnectedUsers: (params..., cb) ->
    @client.get "/users/#{@userId}/connected_users", params..., (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get connected users error'))
      else
        cb null, body, headers

module.exports = User
