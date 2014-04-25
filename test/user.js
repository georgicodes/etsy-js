var etsyjs = require('../lib/etsyjs');
var client = etsyjs.client();
var nock = require('nock');
var expect = require('expect.js');

describe("etsyuser", function() {
    describe("#info", function () {

        // verify that the getFlickrJSON method exists
        it("exists as a public method on user", function () {
            expect(typeof client.user('sparklepony').info).to.eql('function');
        });

//        // verify that the getFlickrJSON method calls the correct URL
//        it("makes the correct http call to Flickr's API based on the parameters it's passed", function () {
//
//            // use nock
//            nock('http://api.flickr.com')
//                .get('/services/feeds/photos_public.gne?format=json&#038;id=someFlickrID')
//                .reply(200, {'some_key':'some_value'});
//
//            flickrFeeder.getFlickrJSON({id: 'someFlickrID'}, function (data) {
//                expect(data).to.eql({'some_key':'some_value'});
//            });
//        });
    });
});