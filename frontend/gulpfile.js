/**
 * Archivo de configuración de gulp
 * 
 * @extends Gulp
 * @extends Config
 * @extends Path
 * @extends Plugins
 * @extends Functions
 * @extends Task
 * @author Victor Sandoval
 */

var gulp      = require('gulp'),
    path      = require('./config/path'),
    config    = require('./config/config.local'),
    plugins   = require('./config/plugins'),
    functions = require('./config/functions');

var runTask = function (nameTask){
  var Task = require("./config/tasks/" + nameTask);
  Task(gulp, path, config, plugins, functions);
};

runTask("gulp_clean");
runTask("gulp_copy");
runTask("gulp_css");
runTask("gulp_sprites");
runTask("gulp_fonts");
runTask("gulp_html");
runTask("gulp_icons");
runTask("gulp_js");
runTask("gulp_server");
runTask("gulp_watch");
runTask("gulp_bower");
runTask("gulp_mocha");


gulp.task('default', function(cb){
	plugins.runSequence('clean', 'icons:compile', 'fonts:compile', 'css', 'js', 'copy', cb)
});