nock = require("nock")
should = require("chai").should()
etsyjs = require("../lib/etsyjs")
client = etsyjs.client({key:'testKey'})

describe "shop", ->

  it "should be able to find a single shop", ->
    nock("https://openapi.etsy.com")
      .get("/v2/shops/boutiqueviolet?api_key=testKey")
      .replyWithFile(200, __dirname + '/responses/getShop.single.json')

    client.shop("boutiqueviolet").find (err, body, headers) ->
      body.results[0].shop_name.should.equal "littletjane"