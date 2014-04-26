var nock = require('nock');
var should = require('chai').should();

var etsyjs = require('../lib/etsyjs');
var client = etsyjs.client();

describe("etsyuser", function () {

    it("should be able to find a single user", function () {

        nock('https://openapi.etsy.com')
            .get('/v2/users/sparklepony')
            .replyWithFile(200, './responses/getUser.single.json')

        client.user('sparklepony').getUser(function (err, body, headers) {
            body.results[0].login_name.should.equal("sparklepony");
        });
    });
});

