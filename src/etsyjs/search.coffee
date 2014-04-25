class Search

  constructor: (@client) ->

  # Finds all Users whose name or username match the keywords parameter
  # '/users' GET
  findAllUsers: (params, cb) ->
    console.log(params)
    @client.get "/users", params, (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Search users error'))
      else
        cb null, body, headers

module.exports = Search