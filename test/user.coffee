nock = require("nock")
should = require("chai").should()
etsyjs = require("../lib/etsyjs")
client = etsyjs.client()

describe "etsyuser", ->

  it "should be able to find a single user", ->
    nock("https://openapi.etsy.com").get("/v2/users/sparklepony").replyWithFile 200, "./responses/getUser.single.json"
    client.user("sparklepony").getUser (err, body, headers) ->
      body.results[0].login_name.should.equal "sparklepony"
      return
    return
  return



