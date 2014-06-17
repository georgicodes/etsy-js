nock = require "nock"
should = require("chai").should()
etsyjs = require "../lib/etsyjs"
client = etsyjs.client({key:'testKey'})

describe "search", ->

  it "should be able to find first page of all users with keyword rainbow", ->
    nock("https://openapi.etsy.com")
      .get("/v2/users?keywords=rainbow&api_key=testKey")
      .replyWithFile(200, __dirname + '/responses/user/findAllusers.json')

    params = {keywords : "rainbow"}
    client.search().findAllUsers params, (err, body, headers) ->
      body.count.should.equal 8151
      body.results[0].login_name.should.equal "rainbowilana"
      body.results.length.should.equal 25
      body.params.keywords.should.equal "rainbow"
      body.params.limit.should.equal 25
      body.params.offset.should.equal 0
      should.not.exist(body.params.page)

  it "should be able to find second page of all users with keyword rainbow", ->
    nock("https://openapi.etsy.com")
      .get("/v2/users?keywords=rainbow&offset=1&limit=25&api_key=testKey")
      .replyWithFile(200, __dirname + '/responses/user/findAllusers.page2.json')

    params = {keywords : "rainbow", offset: 1, limit: 25}
    client.search().findAllUsers params, (err, body, headers) ->
      body.count.should.equal 8151
      body.results[0].login_name.should.equal "Rainbowsnaps"
      body.results.length.should.equal 25
      body.params.keywords.should.equal "rainbow"
      body.params.limit.should.equal "25"
      body.params.offset.should.equal "1"
      should.not.exist(body.params.page)