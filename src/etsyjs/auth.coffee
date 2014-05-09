#var oauth = new OAuth.OAuth(
#  'https://api.twitter.com/oauth/request_token',
#  'https://api.twitter.com/oauth/access_token',
#  'your Twitter application consumer key',
#  'your Twitter application secret',
#  '1.0A',
#  null,
#  'HMAC-SHA1'
#);
#oauth.get(
#  'https://api.twitter.com/1.1/trends/place.json?id=23424977',
#  'your user token for this app',
#//you can get it at dev.twitter.com for your own apps
#'your user secret for this app',
#//you can get it at dev.twitter.com for your own apps
#function (e, data, res){
#if (e) console.error(e);
#console.log(require('util').inspect(data));
#done();
#});
#});
# Required modules
#request = require 'request'
#url = require 'url'

OAuth = require('OAuth')

class Auth

  constructor: (@client) ->

  requestToken: ->
    etsyOAuth = new OAuth.OAuth(
      'https://openapi.etsy.com/v2/oauth/request_token',
      'https://openapi.etsy.com/v2/oauth/access_token',
      'cndq8yyle7c6ssplz81bf4od',
      '89fq6biy8w',
      '1.0',
      null,
      'HMAC-SHA1'
    )
    etsyOAuth.getOAuthRequestToken(err, oauthToken, oautTokenSecret, results) ->
      return new Error(err.data) if err
      console.log "in oauth request"
      console.log oauthToken
      console.log oauthTokenSecret
      return 'yup'

module.exports = Auth