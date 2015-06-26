/**
 * Tarea para manejar librerias de bower
 *
 * @module Task (gulp bower)
 * @extends Gulp
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, path, config, plugins, functions){

	gulp.task('bower:init', plugins.shell.task([
	  'bower install'
	]));

	/**
	 * Tarea para filtrar archivos de las librerías de bower
	 * (gulp bower:filter)
	 * 
	 * Se puede especificar que solo traiga los js de las librería a descargar
	 * y estas se deben listar en el objeto {} "preen", dentro de archivo bower.json
	 */
	gulp.task('bower:filter', function(cb) {
		plugins.preen.preen({}, cb);
	});

	/**
	 * Tarea principal
	 * (gulp bower)
	 */
	gulp.task('bower', function (callback) {
		plugins.runSequence('bower:init', 'bower:filter',  callback);
	});
}

module.exports = Task;