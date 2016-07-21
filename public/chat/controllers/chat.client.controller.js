angular.module('chat').controller('ChatController', ['$scope', 'Socket',
  function($scope, Socket) {
    $scope.messages = [];
    Socket.on('chatMessage', function(message) {
      $scope.messages.push(message);
    });
    $scope.sendMessage = function() {
      var message = {
        text: this.messageText
      };
      console.log('message:' + message);
      Socket.emit('chatMessage', message);
      this.messageText = '';
    };
    //当断开连接的时候，将该监听器进行移除
    $scope.$on('$destory', function() {
      Socket.removeListener('chatMessage');
    });
  }
]);
