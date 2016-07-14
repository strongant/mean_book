var passport = require('passport'),
  url = require('url'),
  QQStrategy = require('passport-qq2015').Strategy,
  //qq-token
  config = require('../config'),
  users = require('../../app/controllers/users.server.controller');

/*passport.use(new QQStrategy({
    clientID: config.qq.clientID,
    clientSecret: config.qq.clientSecret,
    callbackURL: "http://1998c26f.ngrok.natapp.cn/auth/qq/callback"
  },
  function(req, accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      qqId: profile.id
    }, function(err, user) {
      return done(err, user);
    });
  }
));*/

module.exports = function() {
  passport.use('qq-token', new QQStrategy({
      clientID: config.qq.clientID,
      clientSecret: config.qq.clientSecret,
      callbackURL: config.qq.callbackURL
    },
    function(req, accessToken, refreshToken, profile, done) {
      try {
        if (!profile) {
          return done(null, false);
        }
        console.log('profile type:' + typeof profile);

        var providerData = profile;
        var _profile = JSON.parse(profile);
        console.log('providerUserProfile:');
        console.log(_profile);

        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;
        var providerUserProfile = {
          fullName: _profile.nickname,
          username: _profile.nickname,
          gender: _profile.gender,
          province: _profile.province,
          provider: 'qq',
          providerId: _profile.year,
          city: _profile.city,
          year: _profile.year,
          prividerData: providerData
        };
        users.saveOAuthUserProfile(req, providerUserProfile, done);
      } catch (e) {
        console.log(e.toString());
      }
    }
  ));
};
