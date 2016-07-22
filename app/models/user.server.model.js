var crypto = require('crypto'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: ['Admin', 'Owner', 'User']
  },
  email: {
    type: String,
    index: true,
    match: /.+\@.+\..+/
  },
  username: {
    type: String,
    unique: true,
    required: 'userName is required',
    trim: true
  },
  password: {
    type: String,
    validate: [function(password) {
      return password.length >= 6
    }, 'Password should be longer']
  },
  salt: {
    type: String
  },
  provider: {
    type: String
      //required: 'Provider is required'
  },
  providerId: String,
  prividerData: {},
  created: {
    type: Date,
    default: Date.now
  },
  website: {
    type: String,
    set: function(url) {
      if (!url) {
        return url;
      } else {
        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          url = 'http://' + url;
        }
        return url;
      }
    },
    get: function(url) {
      if (!url) {
        return url;
      } else {
        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          url = 'http://' + url;
        }
        return url;
      }
    }
  }
});
UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});
/*.set(function(fullName) {
  var splitName = fullName.split(' ');
  this.firstName = spitName[0] || '';
  this.lastName = splitName[1] || ''
})*/
UserSchema.set('toJson', {
  getters: true,
  virtuals: true
});
//自定义静态方法查询
UserSchema.statics.findOneByUsername = function(username, callback) {
  this.findOne({
    username: new RegExp(username, 'i')
  }, callback);
};
//自定义实例方法
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};
UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString(
    'hex');
};
//预处理中间件-前置处理
UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),
      'base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});

//预处理-后置处理,比如添加日志操作
UserSchema.post('save', function(next) {
  if (this.isNew) {
    console.log('A new user was created');
  } else {
    console.log('A user updated is details');
  }
});
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;
  var possibleUsername = username + (suffix || '');
  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1,
          callback);
      }
    } else {
      callback(null);
    }
  });
};
UserSchema.set('toJson', {
  getters: true,
  virtuals: true
});
mongoose.model('User', UserSchema);
