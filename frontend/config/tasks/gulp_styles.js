/**
 * GULP STYLES: Tarea para compilar css mediante archivos stylus
 * @author Victor Sandoval
 * @constructor
 */
function Task(gulp, path, config, plugins, functions){

	pathStylesFiles = [
		path.frontend.stylus + '/**/*.styl',
		'!' + path.frontend.stylus + '/_**/*.styl',
		'!' + path.frontend.stylus + '/**/_**/*.styl',
		'!' + path.frontend.stylus + '/**/**/_**/*.styl'
	]

	gulp.task('styles', function () {
		return gulp.src(pathStylesFiles)
			.pipe(plugins.stylus({
				compress: config.prod,
				use     : [plugins.rupture(), plugins.jeet(), plugins.nib()],
				import 	: ['jeet','nib'] //Rupture no es necesario, lo incluye en su librería
			}))
			.on('error', functions.errorHandler)
			.pipe(plugins.urlVersion({lastcommit: true}))
			.pipe(gulp.dest(path.dest.css))
			.on('end', functions.successHandler);
	});

	gulp.task('styles:all', function(callback) {
		plugins.runSequence('clean:css', 'styles', callback);
	});
}

module.exports = Task;