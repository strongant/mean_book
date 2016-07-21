angular.module('chat').service('Socket', ['Authentication', '$location',
  '$timeout',
  function(Authentication, $location, $timeout) {
    if (Authentication.user) {
      this.socket = io();
    } else {
      $location.path('/');
    }
    //通过时间名称和服务端进行通信
    this.on = function(eventName, callback) {
      if (this.socket) {
        this.socket.on(eventName, function(data) {
          $timeout(function() {
            callback(data);
          });
        });
      }
    };
    //通过事件名称进行发出信息
    this.emit = function(eventName, data) {
      if (this.socket) {
        console.log('chat.service.client:[eventName:' + eventName +
          ',data:' + JSON.stringify(data)) + ']';
        this.socket.emit(eventName, data);
      }
    };
    //移除监听事件根据具体的事件名
    this.removeListener = function(eventName) {
      if (this.socket) {
        this.socket.removeListener(eventName);
      }
    };



  }
]);
