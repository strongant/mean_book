module.exports = {
  db: 'mongodb://localhost/mean-book-test',
  sessionSecret: 'developmentSessionSecret',
  facebook: {
    clientId: '1002658109829359',
    clientSecret: 'f9d987edd705c0ec66343f4fda75ddf8',
    callbackURL: 'http://localhost:3000/oauth/facebook/callback'
  },
  twitter: {
    clientId: '1002658109829359',
    clientSecret: 'f9d987edd705c0ec66343f4fda75ddf8',
    callbackURL: 'http://localhost:3000/oauth/twitter/callback'
  },
  google: {
    clientId: '1089773081106-u22fd3sg5apfipgdlerfe8rs9at03o5k.apps.googleusercontent.com',
    clientSecret: 'lYqjgQsWq0SfwiLfPJT2B3Qv',
    callbackURL: 'http://localhost:3000/oauth/google/callback'
  },
  qq: {
    clientID: '101330197',
    clientSecret: 'b910f8888d71d4d53c9e24f2f43482ce',
    callbackURL: 'http://f62e7e9.ngrok.natapp.cn/oauth/qq/callback'
  }
};
