express = require('express')
session = require('express-session')
cookieParser = require('cookie-parser')
url = require('url')
etsyjs = require('./lib/etsyjs')

client = etsyjs.client
  key: 'd8gg8bayavzaka22i0fiuoaw',
  secret: 'yjnoedkykc'
  callbackURL: 'http://localhost:3000/authorise'

app = express()
app.use(cookieParser('secEtsy'))
app.use(session())

app.get '/', (req, res) ->
  client.requestToken (err, response) ->
    console.log "=== requesting token ==="
    req.session.token = response.token
    req.session.sec = response.tokenSecret
    res.redirect response.loginUrl


app.get '/authorise', (req, res) ->
  query = url.parse(req.url,true).query;
  verifier = query.oauth_verifier
  console.log "=== authorising ==="
  client.accessToken req.session.token, req.session.sec, verifier, (err, response) ->
    req.session.token = response.token
    req.session.sec = response.tokenSecret
    client.user().myself req.session.token, req.session.sec, (err, body, headers) ->
#    etsyUser.getProfile (err, body, headers) ->
      console.log 'body'
      console.log body
      res.send body.results[0].login_name



server = app.listen 3000, ->
  console.log 'Listening on port %d', server.address().port