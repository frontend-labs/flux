/**
 * Contiene todos los plugins de las tareas gulp
 *
 * @module Plugins
 * @author Victor Sandoval
 */

var Plugins = {
  // Plugins globales
  if              : require('gulp-if'),
  runSequence     : require('run-sequence'),
  shell           : require('gulp-shell'),
  recursiveConcat : require('gulp-recursive-concat'),
  notifier        : require("node-notifier"),
  util            : require('gulp-util'), 
  // Plugins mocha
  insert          : require('gulp-insert'),
  es              : require('event-stream'),
  mocha           : require('gulp-mocha'),
  fs              : require('fs'),
  path            : require('path'),
  // Plugins gulp clean
  del             : require('del'),
  // Plugins gulp copy
  imagemin        : require('gulp-imagemin'),
  imageminPNG     : require('imagemin-optipng'),
  imageminJPG     : require('imagemin-jpegtran'),
  imageminGIF     : require('imagemin-gifsicle'),
  imageminSVG     : require('imagemin-svgo'),
  // Plugins gulp styles
  stylus          : require('gulp-stylus'),
  urlVersion      : require('gulp-css-url-versioner'),
  rupture         : require('rupture'),
  jeet            : require('jeet'),
  nib             : require('nib'),
  // Plugins gulp sprite
  spritesmith     : require('gulp.spritesmith'),
  // Plugins gulp fonts
  consolidate     : require("gulp-consolidate"),
  // Plugins gulp jade
  jade            : require('gulp-jade'),
  // Plugins gulp icons
  iconfont        : require('gulp-iconfont'),
  // Plugins gulp js
  coffee          : require('gulp-coffee'),
  uglify          : require('gulp-uglify'),
  jshint          : require('gulp-jshint'),
  complexity      : require('gulp-complexity'),
  // Plugins gulp watch
  browserSync     : require('browser-sync'),
  express         : require('express'),
  // Plugins gulp bower
  preen           : require('preen'),
  // Plugins unit test
  mocha           : require('gulp-mocha') 
}

module.exports = Plugins;