class Shop

  constructor: (@shopId, @client) ->

  # Retrieves a Shop by id
  # '/shops/:shop_id' GET
  getShop: (cb) ->
    @client.get "/shops/#{@shopId}", (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get shop error'))
      else
        cb null, body, headers

module.exports = Shop