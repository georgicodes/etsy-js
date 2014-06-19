express = require('express')
session = require('express-session')
cookieParser = require('cookie-parser')
url = require('url')
fs = require('fs')
nconf = require('nconf')
etsyjs = require('../lib/etsyjs')

# nconf reads in config values from json file
nconf.argv().env()
nconf.file({ file: './examples/config.json' })

# instantiate client with key and secret and set callback url
client = etsyjs.client
  key: nconf.get('key')
  secret: nconf.get('secret')
  callbackURL: 'http://localhost:3000/authorise'

app = express()
app.use(cookieParser('secEtsy'))
app.use(session())

app.get '/', (req, res) ->
  oauthSession = {token: req.session.token, secret: req.session.sec}

  # if we are accessing the API for the first time, then kick off OAuth dance
  if (not oauthSession.token? && not oauthSession.secret?)
    client.requestToken (err, response) ->
      return console.log err if err
      req.session.token = response.token
      req.session.sec = response.tokenSecret
      res.redirect response.loginUrl
  else
    # else if we have OAuth credentials for this session then use them
    client.auth(oauthSession.token, oauthSession.secret).user("etsyjs").find (err, body, headers) ->
      console.log err if err
      console.dir(body) if body
      res.send body.results[0] if body

app.get '/shop', (req, res) ->
  oauthSession = {token: req.session.token, secret: req.session.sec}
  console.log("fetching a shop...")
  client.auth(oauthSession.token, oauthSession.secret).shop('ParisienneLuxe').find (err, body, headers) ->
    console.log err if err
    console.dir(body) if body
    res.send body.results[0].shop_name if body

app.get '/update', (req, res) ->
  oauthSession = {token: req.session.token, secret: req.session.sec}
  console.log("updating profile...")
  updatedProfile = {user_id: "etsyjs", city: "New York City"}
  client.auth(oauthSession.token, oauthSession.secret).user("etsyjs").updateUserProfile updatedProfile, (err, body, headers) ->
    console.log err if err
    res.send body.results[0] if body

app.get '/create', (req, res) ->
  oauthSession = {token: req.session.token, secret: req.session.sec}
  console.log("creating new address...")
  newAddress = {user_id: "etsyjs", name: "Etsy JS", first_line:"100 E8th St", city:"New York City", state:"New York", zip:"10009", country_id:209}
  client.auth(oauthSession.token, oauthSession.secret).address("etsyjs").create newAddress, (err, body, headers) ->
    console.log err if err
    console.dir(body) if body
    res.send body.results[0] if body

app.get '/delete', (req, res) ->
  oauthSession = {token: req.session.token, secret: req.session.sec}
  console.log("deleting address...")
  client.auth(oauthSession.token, oauthSession.secret).address("etsyjs").delete 12787771379, (err, body, headers) ->
    console.log err if err
    console.dir(body) if body
    res.send body.results[0] if body

app.get '/authorise', (req, res) ->
  # parse the query string for OAuth verifier
  query = url.parse(req.url, true).query;
  verifier = query.oauth_verifier
  console.log ("==> with OAuth verifier #{verifier} and token #{req.session.token} and secret #{req.session.sec}")

  # final part of OAuth dance, request access token and secret with given verifier
  client.accessToken req.session.token, req.session.sec, verifier, (err, response) ->
    # update our session with OAuth token and secret
    req.session.token = response.token
    req.session.sec = response.tokenSecret
    res.redirect '/'

server = app.listen 3000, ->
  console.log 'Listening on port %d', server.address().port