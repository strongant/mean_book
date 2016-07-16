var passport = require('passport'),
url = require('url'),
GoogleStrategy = require('passport-google-auth').Strategy,
config=require('../config'),
users = require('../../app/controllers/users.server.controller');


module.exports = function(){
  passport.use(new GoogleStrategy({
    clientId:config.google.clientId,
    clientSecret:config.google.clientSecret,
    callbackURL:config.google.callbackURL,
    passReqToCallback:true
  },function(req, accessToken, refreshToken, profile, done){
    console.log('accessToken:');
    console.log(accessToken);
    console.log('profile:');
    console.log(profile);
    console.log(typeof profile);
    var prividerData = profile;
    prividerData.accessToken = accessToken;
    prividerData.refreshToken = refreshToken;
    var providerUserProfile = {
      firstName:profile.name.givenName,
      lastName:profile.name.familyName,
      fullName:profile.displayName,
      email:profile.emails[0].value,
      username:profile.displayName,
      provider:'google',
      providerId:profile.id,
      prividerData:JSON.stringify(prividerData)
    };
    users.saveOAuthUserProfile(req,providerUserProfile,done);
  }));
};
