/**
 * Tarea para compilar archivos .styl
 *
 * @module Task (gulp styles)
 * @extends Gulp
 * @extends Path
 * @extends Config
 * @extends Plugins
 * @extends Functions
 * @author Victor Sandoval
 */

function Task(gulp, path, config, plugins, functions){

	pathStylesFiles = [
		path.frontend.stylus + '/**/*.styl',
		'!' + path.frontend.stylus + '/_**/*.styl',
		'!' + path.frontend.stylus + '/**/_**/*.styl',
		'!' + path.frontend.stylus + '/**/**/_**/*.styl'
	]

	/**
	 * Tarea usada por el gulp watch
	 * (gulp styles)
	 *
	 * Utiliza plugins como
	 * Rupture : Proporciona mixins para los breakpoints en css
	 * Jeet    : Proporciona mixins para un sistema de grillas
	 * Nib     : Proporciona mixins cross-browser para propiedades CCS3
	 */
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


	/**
	 * Tarea principal
	 * (gulp styles:all)
	 */
	gulp.task('styles:all', function(callback) {
		plugins.runSequence('clean:css', 'styles', callback);
	});
}

module.exports = Task;