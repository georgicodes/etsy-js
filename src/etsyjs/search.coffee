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

  responseHandler = (cb, errorMessage) ->
    return (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        return cb(new Error(errorMessage))
      else
        return cb null, body, headers

  # Finds all Users whose name or username match the keywords parameter
  # '/users' GET
  findAllUsers: (params, cb) ->
    @client.get "/users", params, responseHandler(cb, 'Search users error')

  # Finds all listings
  # '/listings' GET
  findAllListings: (params, cb) ->
    @client.get "/listings", params, responseHandler(cb, 'Search listings error')

  # Finds listings with specified ids
  # '/listings/:listing_id' GET
  findListingByIds: (ids, params, cb) ->
    uriParam = if Array.isArray(ids) then ids.join(',') else ids
    @client.get "/listings/" + uriParam, params, responseHandler(cb, 'Search listings error')

module.exports = Search