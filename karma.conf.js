module.exports = function(config) {
  config.set({
    //使用Jasmine测试框架
    frameworks: ['jasmine'],
    //设置测试中需要包含的文件列表，可以使用shell中的通配符来匹配文件
    files: [
      'public/lib/angular/angular.js',
      'public/lib/angular-resource/angular-resource.js',
      'public/lib/angular-route/angular-route.js',
      'public/lib/angular-mocks/angular-mocks.js',
      'public/application.js',
      'public/*[!lib]*/*.js',
      'public/*[!lib]*/*[!tests]*/*.js',
      'public/tests/unit/*.js'
    ],
    //设置Karma测试结果报告的方式
    reporters: ['progress'],
    //设置Karma执行测试的额浏览器列表
    browsers: ['PhantomJS'],
    //设置Karma测试超时时间
    captureTimeout: 60000,
    //测试执行完毕后退出Karma
    singleRun: true
  });
};
//具体详情配置可以参考github地址:[http://karma-runner.github.io/0.12/config/configuration-file.html]
