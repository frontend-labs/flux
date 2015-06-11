/**
 * GULP BOWER: Tarea para ejecutar por comando bower install
 * @author Victor Sandoval
 * @constructor
 */
function Task(gulp, path, config, plugins){

	gulp.task('bower:init', plugins.shell.task([
	  'bower install'
	]));
}

module.exports = Task;