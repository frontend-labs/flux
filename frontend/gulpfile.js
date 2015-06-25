var gulp    = require('gulp'),
    path    = require('./config/path'),
    config  = require('./config/config.local');

var plugins = {
  if              : require('gulp-if'),
  runSequence     : require('run-sequence'),
  shell           : require('gulp-shell'),
  recursiveConcat : require('gulp-recursive-concat'),
  notifier        : require("node-notifier"),
  util            : require('gulp-util'),
  // GULP CLEAN
  rimraf          : require('gulp-rimraf'),
  // GULP COPY
  imagemin        : require('gulp-imagemin'),
  imageminPNG     : require('imagemin-optipng'),
  imageminJPG     : require('imagemin-jpegtran'),
  imageminGIF     : require('imagemin-gifsicle'),
  imageminSVG     : require('imagemin-svgo'),
  // GULP STYLES
  stylus          : require('gulp-stylus'),
  urlVersion      : require('gulp-css-url-versioner'),
  rupture         : require('rupture'),
  jeet            : require('jeet'),
  nib             : require('nib'),
  // GULP SPRITE
  spritesmith     : require('gulp.spritesmith'),
  // GULP FONTS
  consolidate     : require("gulp-consolidate"),
  // GULP JADE
  jade            : require('gulp-jade'),
  // GULP ICON
  iconfont        : require('gulp-iconfont'),
  // GULP COFFEE
  coffee          : require('gulp-coffee'),
  uglify          : require('gulp-uglify'),
  jshint          : require('gulp-jshint'),
  complexity      : require('gulp-complexity'),
  //GULP SERVER
  browserSync     : require('browser-sync'),
  nodemon         : require('gulp-nodemon'),
  //GULP BOWER
  preen           : require('preen')
}

var functions = {
  errorHandler : function(error){
    var colorRed = plugins.util.colors.red;
    plugins.notifier.notify({
      title   : 'Error en la tarea: ' + error.plugin,
      message : error.message
    });
    plugins.util.log(
      '\n',
      colorRed('----------------------------'),'\n',
      colorRed(' Error en la tarea: ' + error.plugin), '\n',
      colorRed('----------------------------'), '\n',
      error.message, '\n',
      colorRed('----------------------------')
    );
    this.emit('end');
  },
  successHandler : function(){
    plugins.notifier.notify({
      title   : 'Compilación completa',
      message : 'Tarea terminada'
    });
  }
}

var runTask = function (nameTask){
  var Task = require("./config/tasks/" + nameTask);
  new Task(gulp, path, config, plugins, functions);
};

runTask("gulp_clean");
runTask("gulp_copy");
runTask("gulp_styles");
runTask("gulp_sprite");
runTask("gulp_fonts");
runTask("gulp_html");
runTask("gulp_icons");
runTask("gulp_js");
runTask("gulp_watch");
runTask("gulp_bower");

gulp.task('default', ['clean'], function (cb) {
  plugins.runSequence('copy', 'fonts', 'icons', 'sprite', 'styles:all', 'js:all', cb);
});
