class Category

  constructor: (@tag, @client) ->

  # Retrieves a top-level Category by tag
  # '/categories/:tag' GET
  find: ({token, secret}, cb) ->
    @client.get "/categories/#{@tag}", token, secret, (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get categories error'))
      else
        cb null, body, headers

  # Retrieves all top-level Categories
  # '/taxonomy/categories' GET
  topLevelCategories: ({token, secret}, cb) ->
    @client.get "/taxonomy/categories", token, secret, (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get top level categories error'))
      else
        cb null, body, headers

module.exports = Category