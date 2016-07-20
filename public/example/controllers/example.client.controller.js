angular.module('example')
  .controller('ExampleController', ['$scope', 'ExampleService',
    'Authentication',
    function($scope, ExampleService, Authentication) {
      $scope.name = Authentication.user ? Authentication.user.fullName :
        'MEAN Application Test';
      $scope.authentication = Authentication;
    }
  ]);
