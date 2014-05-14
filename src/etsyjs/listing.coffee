class Listing

  constructor: (@listingId, @client) ->

  # Retrieves listings by id
  # '/listings/:listing_id' GET
  find: ({token, secret}, cb) ->
    @client.get "/listings/#{@listingId}", token, secret, (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Get listings error'))
      else
        cb null, body, headers

module.exports = Listing