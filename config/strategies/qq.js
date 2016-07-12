var passport = require('passport'),
  url = require('url'),
  QQStrategy = require('passport-qq2015').Strategy,
  //qq-token
  config = require('../config'),
  users = require('../../app/controllers/users.server.controller');
/*
passport.use(new qqStrategy({
    clientID: client_id,
    clientSecret: client_secret,
    callbackURL: "http://127.0.0.1:3000/auth/qq/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ qqId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
 */
module.exports = function() {
  passport.use('qq-token', new QQStrategy({
      clientID: config.qq.clientID,
      clientSecret: config.qq.clientSecret,
      callbackURL: config.qq.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {

      console.log('profile type:' + typeof profile);

      var providerData = profile;
      var _profile = JSON.parse(profile);
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;
      var providerUserProfile = {
        fullName: _profile.nickname,
        username: _profile.nickname,
        gender: _profile.gender,
        province: _profile.province,
        provider: 'qq',
        profiderId: _profile.id,
        city: _profile.city,
        year: _profile.year,
        providerData: providerData
      };
      console.log('providerUserProfile:');
      console.log(providerUserProfile);
      users.saveOAuthUserProfile(req, providerUserProfile, done);
    }
  ));
};
