nock = require("nock")
should = require("chai").should()
etsyjs = require("../lib/etsyjs")
client = etsyjs.client({key:'testKey'})

describe "listing", ->

  it "should be able to find a single listing", ->
    nock("https://openapi.etsy.com")
      .get("/v2/listings/59759273?api_key=testKey")
      .replyWithFile(200, __dirname + '/responses/getListing.single.json')

    client.listing(59759273).find (err, body, headers) ->
      body.results[0].listing_id.should.equal 59759273

  it "should be able to find all active listings", ->
    nock("https://openapi.etsy.com")
    .get("/v2/listings/active?api_key=testKey")
    .replyWithFile(200, __dirname + '/responses/listing/findAllListingActive.category.json')

    client.listing().active (err, body, headers) ->
      body.results[0].listing_id.should.equal 69065674

  it "should be able to find all active listings by category", ->
    nock("https://openapi.etsy.com")
    .get("/v2/listings/active?category=accessories&api_key=testKey")
    .replyWithFile(200, __dirname + '/responses/listing/findAllListingActive.category.json')

    params = {category: "accessories"}
    client.listing().active params, (err, body, headers) ->
      body.results[0].listing_id.should.equal 69065674

  it "should be able to find all trending listings", ->
    nock("https://openapi.etsy.com")
    .get("/v2/listings/trending?api_key=testKey")
    .replyWithFile(200, __dirname + '/responses/listing/findAllListingActive.category.json')

    client.listing().trending (err, body, headers) ->
      body.results[0].listing_id.should.equal 69065674