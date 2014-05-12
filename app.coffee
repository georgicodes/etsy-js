express = require('express')
session = require('express-session')
cookieParser = require('cookie-parser')
url = require('url')
fs = require('fs')
nconf = require('nconf')
etsyjs = require('./lib/etsyjs')

nconf.argv().env()
nconf.file({ file: 'config.json' })

client = etsyjs.client
  key: nconf.get('key')
  secret: nconf.get('secret')
  callbackURL: 'http://localhost:3000/authorise'

app = express()
app.use(cookieParser('secEtsy'))
app.use(session())

app.get '/', (req, res) ->
    if (not req.session.token? && not req.session.sec?)
      client.requestToken (err, response) ->
        req.session.token = response.token
        req.session.sec = response.tokenSecret
        res.redirect response.loginUrl
    else
      params = {token: req.session.token, secret: req.session.sec}
#      params = {limit: 5}
      client.user('georgiknox').find params, (err, body, headers) ->
        console.log "error #{err}" if err
        console.log "Returned result #{body}" if body
        res.send body.results[0].login_name if body

app.get '/authorise', (req, res) ->
  query = url.parse(req.url, true).query;
  verifier = query.oauth_verifier
  client.accessToken req.session.token, req.session.sec, verifier, (err, response) ->
    req.session.token = response.token
    req.session.sec = response.tokenSecret
    res.redirect '/'

server = app.listen 3000, ->
  console.log 'Listening on port %d', server.address().port