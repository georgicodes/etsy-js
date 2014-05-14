nock = require("nock")
should = require("chai").should()
etsyjs = require("../lib/etsyjs")
client = etsyjs.client({key:'testKey'})

describe "etsyuser", ->

  it "should be able to find a single listing", ->
    nock("https://openapi.etsy.com").get("/v2/listings/59759273?api_key=testKey")
    .replyWithFile(200, __dirname + '/responses/getListing.single.json')
    client.listing(59759273).find {}, (err, body, headers) ->
      body.results[0].listing_id.should.equal 59759273




