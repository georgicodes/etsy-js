(function() {
  var Auth, OAuth;

  OAuth = require('OAuth');

  Auth = (function() {
    function Auth(client) {
      this.client = client;
    }

    Auth.prototype.requestToken = function() {
      var etsyOAuth;
      etsyOAuth = new OAuth.OAuth('https://openapi.etsy.com/v2/oauth/request_token', 'https://openapi.etsy.com/v2/oauth/access_token', 'cndq8yyle7c6ssplz81bf4od', '89fq6biy8w', '1.0', null, 'HMAC-SHA1');
      return etsyOAuth.getOAuthRequestToken(err, oauthToken, oautTokenSecret, results)(function() {
        if (err) {
          return new Error(err.data);
        }
        console.log("in oauth request");
        console.log(oauthToken);
        console.log(oauthTokenSecret);
        return 'yup';
      });
    };

    return Auth;

  })();

  module.exports = Auth;

}).call(this);
