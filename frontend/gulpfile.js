var gulp   = require('gulp'),
    fs     = require('fs'),
    path   = require('./config/path'),
    config = require('./config/config.local');

var plugins = {
    if : require('gulp-if'),
    runSequence : require('run-sequence'),
    // GULP CLEAN
    rimraf      : require('gulp-rimraf'),
    // GULP COPY
    imagemin    : require('gulp-imagemin'),
    imageminPNG : require('imagemin-optipng'),
    imageminJPG : require('imagemin-jpegtran'),
    imageminGIF : require('imagemin-gifsicle'),
    imageminSVG : require('imagemin-svgo'),
    // GULP STYLES
    stylus      : require('gulp-stylus'),
    urlVersion  : require('gulp-css-url-versioner'),
    rupture     : require('rupture'),
    jeet        : require('jeet'),
    // GULP SPRITE
    spritesmith : require('gulp.spritesmith'),
    // GULP FONTS
    consolidate : require("gulp-consolidate"),
    // GULP JADE
    jade        : require('gulp-jade'),
    // GULP ICON
    iconfont    : require('gulp-iconfont'),
    // GULP COFFEE
    coffee      : require('gulp-coffee'),
    jsConcat    : require('gulp-recursive-concat'),
    uglify      : require('gulp-uglify'),
    jshint      : require('gulp-jshint'),
    //GULP SERVER
    browserSync : require('browser-sync'),
    nodemon     : require('gulp-nodemon')
}

var runTask = function (nameTask){
    var Task = require("./config/tasks/" + nameTask);
    return new Task(gulp, path, config, plugins, fs);
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

gulp.task('default', ['clean'], function (cb) {
    plugins.runSequence('fonts', 'icons', 'sprite', 'styles', 'js', 'copy', cb);
});
