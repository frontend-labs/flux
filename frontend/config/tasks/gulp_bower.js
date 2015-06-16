/**
 * GULP BOWER: Tarea para instalar librerias desde bower
 * @author Victor Sandoval
 * @constructor
 */
function Task(gulp, path, config, plugins){

	gulp.task('bower:init', plugins.shell.task([
	  'bower install'
	]));

	gulp.task('bower:filter', function(cb) {
		plugins.preen.preen({}, cb);
	});

	gulp.task('bower', function (callback) {
		plugins.runSequence('bower:init', 'bower:filter',  callback);
	});
}

module.exports = Task;