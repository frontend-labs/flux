/**
 * Archivo de configuración de gulp
 * 
 * @extends Gulp
 * @extends Local
 * @extends PathFiles
 * @extends Plugins
 * @extends Functions
 * @extends Task
 * @author Victor Sandoval
 */

var gulp      = require('gulp'),
    local     = require('./config/local'),
    pathFiles = require('./config/path'),
    plugins   = require('./config/plugins'),
    functions = require('./config/functions'),
    runTask   = function (nameTask){
      return require("./config/tasks/" + nameTask)(gulp, pathFiles, plugins, functions, local);
    };

/**
 * Ejecutando tareas
 */
runTask("gulp_clean").run();
runTask("gulp_copy").run();
runTask("gulp_sprites").run();
runTask("gulp_fonts").run();
runTask("gulp_icons").run();
runTask("gulp_bower").run();
runTask("gulp_mocha").run();
runTask("gulp_server").run();
runTask("gulp_js").run();
runTask("gulp_css").run();

/**
 * Tareas para el watcher de HTML
 */
var taskHTML = runTask("gulp_html");
taskHTML.run();

runTask("gulp_watch").run({
  html: taskHTML.watcher
});

/**
 * Tarea por defecto de Gulp
 */
gulp.task('default', function(cb){
  plugins.runSequence('clean', 'icons:compile', 'fonts:compile', 'css', 'js', 'html', 'copy', 'bower', cb)
});