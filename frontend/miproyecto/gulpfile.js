/*!!
 *
 * gulpfile.js
 * @author: Jan Sanchez, Vistor Sandoval
 *
 */
var gulp    = require('gulp'),
    path    = require('./gulp/path'),
    options = require('./gulp/options'),
    settings = {
        browserSync : require('browser-sync'),
        notify      : require("node-notifier"),
        changelog   : require('conventional-changelog'),
        fs          : require('fs'),
        loadPlugins : require('gulp-load-plugins'),
        package     : require('./package.json'),
        config      : require('./gulp/config.local'),
    },
    plugins = settings.loadPlugins(),
    runTask = function (nameTask){
        var Task = require("./gulp/tasks/" + nameTask);
        return new Task(gulp, path, options, plugins, settings);
    };

plugins.minifyCSS = require('gulp-minify-css');
plugins.runSequence = require('run-sequence');
plugins.spritesmith = require('gulp.spritesmith');

plugins.es = require('event-stream');
plugins.Buffer = require('buffer').Buffer;

//plugins.notifier = new settings.notify();

runTask("gulp-clean");
runTask("gulp-backend");
runTask("gulp-copy");
runTask("gulp-styles");
runTask("gulp-fonts");
runTask("gulp-html");
runTask("gulp-icons");
runTask("gulp-js");
runTask("gulp-sprites");
runTask("gulp-watch");
runTask("gulp-version");

/*!!
*
* Tareas por default
*
* tarea principal: gulp
*/

gulp.task('default', ['clean'], function (cb) {
    plugins.runSequence('sprites', 'icons', 'fonts', 'styles', 'js:default', 'copy', 'html', cb);
});
