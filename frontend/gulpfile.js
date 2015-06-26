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

var Gulp      = require('gulp'),
    Config    = require('./config/config.local')
    Path      = require('./config/path'),
    Plugins   = require('./config/plugins')
    Functions = require('./config/functions');

var runTask = function (nameTask){
  var Task = require("./config/tasks/" + nameTask);
  new Task(Gulp, Path, Config, Plugins, Functions);
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

Gulp.task('default', ['clean'], function (cb) {
  Plugins.runSequence('copy', 'fonts', 'icons', 'sprite', 'styles:all', 'js:all', cb);
});
