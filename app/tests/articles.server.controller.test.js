var app = require('../../server'),
  request = require('supertest')(app),
  should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article');

var user, article;


describe('Articles Controller Unit Tests', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: "Full",
      lastName: "Name",
      displayName: "Full Name",
      email: "test@test.com",
      username: "username",
      password: "password"
    });
    user.save(function() {
      article = new Article({
        title: "Article Title",
        content: "Article Content",
        user: user
      });
      article.save(function(err) {
        done();
      });
    });
  });

  //获取所有文章信息
  describe('Testing the GET methods', function() {
    it('Should be able to get the list of articles', function(done) {
      request.get('/api/articles/')
        .set('Accept', "application/json")
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          res.body.should.be.an.instanceof(Array).and.have.lengthOf(
            1);
          res.body[0].should.have.property('title', article.title);
          res.body[0].should.have.property('content', article.content);
          done();
        });
    });
  });

  //通过文章编号获取一篇文章
  it('Should be able to get the article', function(done) {
    request.get('/api/articles/' + article.id)
      .set('Accept', "application/json")
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        res.body.should.be.an.instanceof(Object).and.have.property(
          'title',
          article.title);
        res.body.should.have.property('content', article.content);

        done();
      });
  });

  afterEach(function(done) {
    Article.remove().exec();
    User.remove().exec();
    done();
  });


});
