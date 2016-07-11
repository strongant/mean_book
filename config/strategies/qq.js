var passport = require('passport'),
  url = require('url'),
  qqStrategy = require('passport-qq').Strategy,
  config = require('../config'),
  users = require('../../app/controllers/users.server.controller');
passport.use(new qqStrategy({
    clientID: client_id,
    clientSecret: client_secret,
    callbackURL: "http://localhost:3000/auth/qq/callback",
    passReqToCallback: true
  },
  function(accessToken, refreshToken, profile, done) {
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;
    var providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      fullName: profile.displayName,
      email: profile.emails[0].value,
      username: profile.username,
      provider: 'qq',
      profiderId: profile.id,
      providerData: providerData
    };
    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }
));
