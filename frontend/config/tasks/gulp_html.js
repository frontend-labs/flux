/**
 * GULP HTML: Tarea para compilar html de archivos .jade 
 * @author Victor Sandoval
 * @constructor
 */
function Task(gulp, path, config, plugins, functions){

	var pathJadeFiles = [
		path.frontend.jade + '/*.jade',
		path.frontend.jade + '/**/*.jade',
		'!' + path.frontend.jade + '/_**/*.jade',
		'!' + path.frontend.jade + '/**/_**/*.jade',
		'!' + path.frontend.jade + '/**/_*.jade'
	]

	gulp.task('html', function() {
		gulp.src(pathJadeFiles)
			.pipe(plugins.jade({
				pretty: true,
				locals: {
					baseUrl 	: "/",
					staticUrl : "/",
					elementUrl: "/",
					version 	: new Date().getTime(),
					module 		: "postulante",
					controller: "home",
					action 		: "index"
				}
			}).on('error', functions.errorHandler))
			.pipe(gulp.dest(path.dest.html))
	});

}

module.exports = Task;