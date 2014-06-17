class Search
  # An odd thing I found out about the Etsy API is that it returns differnt types in param
  # depending on whether you set the limit and offset values or not.
  # If none are specified then limit and offset are returned as int's, but if they are specified
  # due to pagination, they the API returns strings like below:
  #  "params": {
  #    "keywords": "rainbow",
  #    "limit": "25",
  #    "offset": "1",
  #    "page": null
  #  },

  constructor: (@client) ->

  # Finds all Users whose name or username match the keywords parameter
  # '/users' GET
  findAllUsers: (params, cb) ->
    @client.get "/users", params, (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Search users error'))
      else
        cb null, body, headers

  # Finds all listings whose id match the params
  # '/listings' GET
  findAllListings: (params, cb) ->
    @client.get "/listings", params, (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Search listings error'))
      else
        cb null, body, headers

module.exports = Search