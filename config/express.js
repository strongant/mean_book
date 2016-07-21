process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config'),
    //添加对Socket.io的支持
    http = require('http'),
    //添加对Socket.io的支持
    socketio = require('socket.io'), express = require('express'),
    morgan = require('morgan'), compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'), passport = require('passport');
module.exports = function(db) {

  var app = express();
  //添加对Socket.io的支持
  var server = http.createServer(app);
  var io = socketio.listen(server);
  //添加对Socket.io的支持

  app.use(express.static('./public'));
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());
  app.use(methodOverride());

  //用于存储session信息
  var mongoStore = new MongoStore({url : config.db});

  app.use(session({
    saveUninitialized : true,
    resave : true,
    secret : config.sessionSecret,
    store : mongoStore
  }));
  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/users.server.routes.js')(app);
  require('../app/routes/articles.server.routes.js')(app);
  //加入socketio支持
  require('./socketio')(server, io, mongoStore);

  return app;
};
