class User

  constructor: (@login, @client) ->

  # Get a user
  # '/users/mittens' GET
  info: (cb) ->
    @client.get "/users/#{@login}", (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('User info error'))
      else
        cb null, body, headers

module.exports = User
