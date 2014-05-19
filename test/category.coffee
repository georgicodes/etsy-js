nock = require("nock")
should = require("chai").should()
etsyjs = require("../lib/etsyjs")
client = etsyjs.client({key:'testKey'})

describe "etsyuser", ->

  it "should be able to find a single category", ->
    nock("https://openapi.etsy.com").get("/v2/categories/69150467?api_key=testKey")
    .replyWithFile(200, __dirname + '/responses/getCategory.single.json')
    client.category(69150467).find {}, (err, body, headers) ->
      body.results[0].category_name.should.equal "accessories"

  it "should be able to find a category by tag and subtag", ->
    nock("https://openapi.etsy.com").get("/v2/categories/69150467?api_key=testKey")
    .replyWithFile(200, __dirname + '/responses/findAllTopCategoryChildren.json')
    client.category(69150467, '').topLevelCategoryChildren {}, (err, body, headers) ->
      body.results[0].category_name.should.equal "category_name"




