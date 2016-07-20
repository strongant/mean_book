'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var exec = require("child_process").exec;
//检测修改
gulp.task("browsersync-watch", function() {
  gulp.watch([
    "./public/example/**/*.js",
    "./public/example/**/*.html"
  ]).on('change', browserSync.reload);
});


gulp.task('browsersync-test', function() {
  browserSync.init({
    files: ["public/example/**/*.js", "public/example/**/*.html"],
    proxy: "localhost:3000"
  });
});
gulp.task("server", ['browsersync-test']);
