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

	gulp.task('styles:compile', function () {
		return gulp.src(pathStylesFiles)
			.pipe(plugins.stylus({
				compress: config.prod,
				use     : [plugins.rupture(), plugins.jeet(), plugins.nib()],
				import 	: ['jeet','nib'] //Rupture no es necesario, lo incluye en su librería
			}).on('error', functions.standardHandler))
			.pipe(plugins.urlVersion({lastcommit: true}))
			.pipe(gulp.dest(path.dest.css));
	});

	gulp.task('styles', function(callback) {
		plugins.runSequence('clean:css', 'styles:compile', callback);
	});
}

module.exports = Task;