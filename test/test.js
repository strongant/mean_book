//在函数内部可以读取外部变量
/*var n = 999;　　
function f1() {　　　　
  console.log(n);　　
}　　
f1(); // 999*/

//但是不能在函数外部读取函数内部的变量
//ReferenceError: a is not defined
/*function f2() {
  var a = 10;
}
console.log(a);*/

//函数内部如果生命变量不适用var命令，则声明了一个全局的变量
/*function f3() {
  b = "全局变量";
}
f3();
console.log(b);*/

//外部读取局部变量
//链式作用域，函数内部的函数可以访问函数中的变量，但是函数本身不能访问自己函数
//内部的变量
/*function f4() {
  var n = 999;

  function f1() {
    console.log(n);
  }
}*/
//闭包就是能够读取其他函数内部变量的函数。
//由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。
//所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
/*function f5() {　　　　
  var n = 999;　　　　
  function f2() {　　　　　　
    return n;　　　　
  }　　　　
  return f2;　　
}　　
var result = f5();　　
console.log(result()); // 999*/
/*function f1() {　　　　
  var n = 999;　　　　
  nAdd = function() {
    n += 1;
  };　　　
  function f2() {　　　　　　
    console.log(n);　　　　
  }　　　　
  return f2;　　
}　　
var result = f1();　　
result(); // 999
　　
nAdd();　　
result(); // 1000*/
//为什么会这样呢？原因就在于f1是f2的父函数，而
//f2被赋给了一个全局变量，
//这导致f2始终在内存中，
//而f2的存在依赖于f1，因此f1也始终在内存中，
//不会在调用结束后，被垃圾回收机制（garbage collection）回收。
//js中的匿名函数相当于setter，可以在外部进行访问


//闭包的注意点:
//1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，
//所以不能滥用闭包，否则会造成网页的性能问题，
//在IE中可能导致内存泄露。解决方法是，
//在退出函数之前，将不使用的局部变量全部删除。
//2）闭包会在父函数外部，改变父函数内部变量的值。
//所以，如果你把父函数当作对象（object）使用，
//把闭包当作它的公用方法（Public Method），
//把内部变量当作它的私有属性（private value），
//这时一定要小心，不要随便改变父函数内部变量的值
//
/*var name = "The Window";　　
var object = {　　　　
  name: "My Object",
  　　　　getNameFunc: function() {　　　
    return function() {
      console.log(typeof this);　　　　　　　
      return this.name;　　//此时this为Window对象　　　　
    };　　　　
  }　　
};　
console.log(object.getNameFunc()());*/


/*var name = "The Window";　　
var object = {　　　　
  name: "My Object",
  　　　　getNameFunc: function() {　　　　　　
    var that = this;　　　　　　
    return function() {　　　　　　　　
      return that.name;　　　　　　
    };　　　　
  }　　
};　　
console.log(object.getNameFunc()());*/

//如果不是因为某些特殊任务而需要闭包，在没有必要的情况下，在其它函数中创建函数是不明智的，因为闭包对脚本性能具有负面影响，包括处理速度和内存消耗。

//bad Code,每一次构造器的调用方法都会重新赋值一次
/*function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function() {
    console.log('invoke');
    return this.name;
  };
  this.getMessage = function() {
    console.log('invoke');
    return this.message;
  };
}
//good Code
function MyGoodObject(name, message) {
  this.name = name;
  this.message = message;
}
MyGoodObject.prototype = {
  getName: function() {
    return this.name
  },
  getMessage: function() {
    return this.message;
  }
};

//或者
function MyGoodObject(name, message) {
  this.name = name;
  this.message = message;
}
MyGoodObject.prototype.getName = function() {
  return this.name;
};
MyGoodObject.prototype.getMessage = function() {
  return this.message;
};
//每一次向内存申请创建对象空间的时候对方法内的变量进行重复申请
var obj = new MyObject("admin", "hello");
var ob1 = new MyObject("admin", "hello");*/
//console.log(obj.getName());
//
//js和java类似不支持多重继承
/*//传统的方式在一个对象中引用另一个对象去调用它的方法
;
(function() {
  var UserService = function() {
    console.log('UserService use');

    this.getUser = function() {
      return {
        "name": "zhangsan",
        "role": "admin"
      };
    };
  };
  var Notifier = function() {
    this.userService = new UserService();
    //console.log(this.userService.getUser());
  };

  Notifier.prototype.notify = function() {
    var user = this.userService.getUser();
    if (user.role === 'admin') {
      console.log('you aer a admin  role ');
    } else {
      console.log('Hello :' + user.name);
    }
  };
  var notifer = new Notifier();
  notifer.notify();
})();
*/
//使用注入的方式进行编码
/*;
(function() {
  var UserService = function() {
    this.getUser = function() {
      return {
        "name": "zhangsan",
        "role": "admin"
      };
    };
  };
  var Notifier = function(userService) {
    this.userService = userService;
  };
  Notifier.prototype.notify = function() {
    var user = this.userService.getUser();
    if (user.role === 'admin') {
      console.log('you aer a admin  role ');
    } else {
      console.log('Hello :' + user.name);
    }
  };

  var notifer = new Notifier(new UserService());
  notifer.notify();
})();*/

//angularjs的传统注入
/*angular.module('somemodule').controller('HomeController', function($scope) {});*/
//如果通过这种方式进行了代码混淆和压缩之后会导致angular不清楚应该依赖哪一个对象
//被压缩为:angular.module('somemodule').controller('HomeController', function(a) {});
//为了避免这种现象，通过数组的方式进行表示，如：
/*angular.module('somemodule').controller('HomeController', ['$scope'], function(
  $scope) {});*/
//angularjs指令的目的是扩充HTML不是取代HTML
