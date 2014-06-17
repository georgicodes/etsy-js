nock = require "nock"
should = require("chai").should()
etsyjs = require "../lib/etsyjs"
client = etsyjs.client({key:'testKey'})

describe "user", ->

  it "should be able to find a single user", ->
    nock("https://openapi.etsy.com")
      .get("/v2/users/sparklepony?api_key=testKey")
      .replyWithFile(200, __dirname + '/responses/getUser.single.json')

    client.user("sparklepony").find (err, body, headers) ->
      body.results[0].login_name.should.equal "sparklepony"

  it "should be able to find all addresses for a single user", ->
    nock("https://openapi.etsy.com")
      .get("/v2/users/sparklepony/addresses?api_key=testKey")
      .replyWithFile(200, __dirname + '/responses/getUserAddresses.json')

    client.user("sparklepony").addresses (err, body, headers) ->
      body.results.length.should.equal 2

  it "should be able to find user profile", ->
    nock("https://openapi.etsy.com")
      .get("/v2/users/sparklepony/profile?api_key=testKey")
      .replyWithFile(200, __dirname + '/responses/getUser.single.withProfile.json')

    client.user("sparklepony").profile (err, body, headers) ->
      body.results[0].Profile.bio.should.equal "I make stuff"

