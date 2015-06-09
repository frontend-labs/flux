/**
 * GULP STYLES: Tarea para compilar css mediante archivos stylus
 * @author Victor Sandoval
 * @constructor
 */
function Task(gulp, path, config, plugins){

	pathStylesFiles = [
		path.frontend.stylus + '/**/*.styl',
		path.frontend.stylus + '/*.styl',
		'!' + path.frontend.stylus + '/**/**/_**/**/*.styl',
		'!' + path.frontend.stylus + '/**/**/_**/*.styl',
		'!' + path.frontend.stylus + '/_**/*.styl'
	]

	gulp.task('styles', function () {
		return gulp.src(pathStylesFiles)
			.pipe(plugins.stylus({
				compress: config.prod,
				use     : [plugins.rupture(), plugins.jeet()]
			}))
			.pipe(plugins.urlVersion({lastcommit: true}))
			.pipe(gulp.dest(path.dest.css));
	});

}

module.exports = Task;