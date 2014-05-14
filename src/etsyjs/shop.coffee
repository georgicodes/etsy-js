class Shop

  constructor: (@shopId, @client) ->

  # Retrieves a Shop by id
  # '/shops/:shop_id' GET
  find: ({token, secret}, cb) ->
    @client.get "/shops/#{@shopId}", token, secret, (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get shop error'))
      else
        cb null, body, headers


module.exports = Shop