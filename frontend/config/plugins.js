/**
 * Contiene todos los plugins de las tareas gulp
 *
 * @module Plugins
 * @author Victor Sandoval
 */

var Plugins = {
  // Plugins globales
  if              : require("gulp-if"),
  runSequence     : require("run-sequence"),
  recursiveConcat : require("gulp-recursive-concat"),
  notifier        : require("node-notifier"),
  util            : require("gulp-util"),
  gzip            : require("gulp-gzip"),
  // Plugins mocha
  replace         : require("gulp-replace"),
  es              : require("event-stream"),
  mocha           : require("gulp-mocha"),
  fs              : require("fs"),
  path            : require("path"),
  // Plugins gulp clean
  del             : require("del"),
  // Plugins gulp copy
  imagemin        : require("gulp-imagemin"),
  imageminPNG     : require("imagemin-optipng"),
  imageminJPG     : require("imagemin-jpegtran"),
  imageminSVG     : require("imagemin-svgo"),
  // Plugins gulp css
  stylus          : require("gulp-stylus"),
  urlVersion      : require("gulp-css-url-versioner"),
  rupture         : require("rupture"),
  postcss         : require("gulp-postcss"),
  csswring        : require("csswring"),
  autoprefixer    : require("autoprefixer"),
  lost            : require("lost"),
  // Plugins gulp sprite
  spritesmith     : require("gulp.spritesmith"),
  // Plugins gulp fonts
  consolidate     : require("gulp-consolidate"),
  // Plugins gulp jade
  jade            : require("gulp-jade"),
  jadeInheritance : require("jade-inheritance"),
  rename          : require("gulp-rename"),
  // Plugins gulp icons
  iconfont        : require("gulp-iconfont"),
  // Plugins gulp js
  coffee          : require("gulp-coffee"),
  uglify          : require("gulp-uglify"),
  jshint          : require("gulp-jshint"),
  complexity      : require("gulp-complexity"),
  // Plugins gulp watch
  browserSync     : require("browser-sync"),
  express         : require("express"),
  // Plugins gulp bower
  bower           : require("gulp-bower"),
  preen           : require("preen")
}

module.exports = Plugins;
