class User

  constructor: (@userId, @client) ->

  # Retrieves a User by id
  # '/users/:user_id' GET
  getUser: (cb) ->
    @client.get "/users/#{@userId}", (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('User info error'))
      else
        cb null, body, headers

  # Returns a list of users who have circled this user
  # /users/:user_id/circles GET
  getCirclesContainingUser: (cb) ->
    @client.get "/users/#{@userId}/circles", (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('User info error'))
      else
        cb null, body, headers

  # Returns a list of users that are in this user's circle
  # /users/:user_id/connected_users GET
  getConnectedUsers: (cb) ->
    @client.get "/users/#{@userId}/connected_users", (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('User info error'))
      else
        cb null, body, headers

module.exports = User
