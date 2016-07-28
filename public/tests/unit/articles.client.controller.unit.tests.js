describe('Testing Articles Controller', function() {
  var _scope, ArticlesController;

  beforeEach(function() {
    module('mean');
    jasmine.addMatchers({
      toEqualData: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            return {
              pass: angular.equals(actual, expected)
            };
          }
        };
      }
    });
    inject(function($rootScope, $controller) {
      _scope = $rootScope.$new();
      ArticlesController = $controller('ArticlesController', {
        $scope: _scope
      });
    });
  });



  it('Should be registered', function() {
    expect(ArticlesController).toBeDefined();
  });
  it('it should have CRUD methods', function() {
    expect(_scope.find).toBeDefined();
    expect(_scope.findOne).toBeDefined();
    expect(_scope.create).toBeDefined();
    expect(_scope.delete).toBeDefined();
    expect(_scope.update).toBeDefined();
  });

  it(
    'Should have a find method that uses $resource to retrieve a list of articles',
    inject(function(Articles) {
      inject(function($httpBackend) {
        // Create a sample article
        var sampleArticle = new Articles({
          title: 'An Article about MEAN',
          content: 'MEAN rocks!'
        });

        // Create a sample articles list
        var sampleArticles = [sampleArticle];

        // Define a request assertion
        $httpBackend.expectGET('api/articles').respond(
          sampleArticles);

        // Call the controller's 'find' method
        _scope.find();

        // Flush the mock HTTP results
        $httpBackend.flush();

        // Test the results
        expect(_scope.articles).toEqualData(sampleArticles);
      });
    }));

  it(
    'Should have a findone method that users $resource to retreive a single of article',
    inject(
      function(Articles) {
        inject(function($httpBackend, $routeParams) {
          var sampleArticle = new Articles({
            title: "An Article about MEAN",
            content: 'MEAN rocks'
          });
          $routeParams.articleId = 'abcdef123456789012345678';
          $httpBackend.expectGET(/api\/articles\/([0-9a-fA-F]{24})$/)
            .respond(sampleArticle);
          _scope.findOne();
          $httpBackend.flush();
          expect(_scope.article).toEqualData(sampleArticle);

        });
      }
    ));
});