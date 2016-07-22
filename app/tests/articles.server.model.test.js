var app = require('../../server.js'),
  should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article');


var user, article, count = 0;

describe('Article Model Unit Tests:', function() {
  //每次测试操作之前需要做的相关任务
  beforeEach(function(done) {
    user = new User({
      firstName: "Full",
      lastName: "Name",
      displayName: "Full Name",
      email: "test@test.com",
      username: "username" + count++,
      password: "password"
    });

    user.save(function(err) {

      article = new Article({
        title: "Article Title",
        content: "Article Content",
        creator: user
      });
      done();
    });
  });

  describe('Testing the save method', function() {
    it('Should be able to save without problems', function() {
      article.save(function(err) {
        should.not.exist(err);
      });
    });
    it('Should not be able to save an without a title', function() {
      article.title = '';
      article.save(function(err) {
        should.exist(err);
      });
    });
  });

  //表示每次将数据保存完毕后进行清空测试表中的记录
  afterEach(function(done) {
    Article.remove(function() {
      User.remove(function() {
        done();
      });
    });
  });

});



/**/
//测试
/*var add = function(a, b) {
  return a + b;
};
module.exports = add;
var should = require('should');
describe('test add', function() {
  it('1+1=2', function(done) {
    (add(1, 1) === 2).should.be.true;
    done();
  });
});*/
