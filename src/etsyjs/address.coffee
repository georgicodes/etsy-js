util = require('util')

class Address

  constructor: (@userId, @client) ->

  # Retrieves a set of UserAddress objects associated to a User
  # '/users/:user_id/addresses' GET
  findAll: (cb) ->
    @client.get "/users/#{@userId}/addresses", (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Final all user addresses error'))
      else
        cb null, body, headers

  # Creates a new UserAddress
  # /users/:user_id/addresses POST
  create: (address, cb) ->
    @client.post "/users/#{@userId}/addresses", address, (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Create a new user address error'))
      else
        cb null, body, headers

  # Deletes a UserAddress
  # /users/:user_id/addresses/:user_address_id DELETE
  delete: (addressId, cb) ->
    @client.delete "/users/#{@userId}/addresses/#{addressId}", (err, status, body, headers) ->
      return cb(err) if err
      if status isnt 200
        cb(new Error('Delete an address error'))
      else
        cb null, body, headers

module.exports = Address