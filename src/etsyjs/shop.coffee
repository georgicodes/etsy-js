class Shop

  constructor: (@shopId, @client) ->

  # Retrieves a Shop by id
  # '/shops/:shop_id' GET
  find: (cb) ->
    @client.get "/shops/#{@shopId}", (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get shop error'))
      else
        cb null, body, headers

  # Retrieves Listings associated to a Shop that are featured
  # '/shops/:shop_id/listings/featured' GET
  featuredListings: ({token, secret, limit, offset}, cb) ->
    params = {}
    params.limit = limit if limit?
    params.offset = offset if offset?
    @client.get "/shops/#{@shopId}/listings/featured", token, secret, params..., (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get featured listings error'))
      else
        cb null, body, headers

module.exports = Shop