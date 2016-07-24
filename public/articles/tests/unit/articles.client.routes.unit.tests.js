describe('Testing Articles Routing', function() {
  beforeEach(module('mean'));
  it('Should map a "list" route', function() {
    inject(function($route) {
      expect($route.routes['/articles'].templateUrl)
        .toEqual('articles/views/list-articles.client.view.html');
    });
  });
});
