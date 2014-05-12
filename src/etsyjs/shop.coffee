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

  # Retrieves listings for Shop by id
  # '/shops/:shop_id' GET
  getListings: (cb) ->
    @client.get "/shops/#{@shopId}/listings", (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get shop listings error'))
      else
        cb null, body, headers

module.exports = Shop