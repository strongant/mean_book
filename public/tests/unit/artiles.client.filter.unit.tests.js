describe('Testing The Lowercase Filter', function() {
  beforeEach(module('mean'));
  it('Should convert a string characters to lowercase', function() {
    inject(function($filter) {
      var input = 'Hello World';
      var toLowercaseFilter = $filter('lowercase');
      expect(toLowercaseFilter(input)).toEqual(input.toLowerCase());
    });
  });
});
