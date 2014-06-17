class Me

  constructor: (@client) ->

  find: (cb) ->
    @client.getAuthenticated "/users/__SELF__", (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Find authenticated user error'))
      else
        cb null, body, headers

module.exports = Me