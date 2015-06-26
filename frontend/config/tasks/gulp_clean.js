/**
 * Tarea para eliminar o limpiar los archivos generados por las tareas gulp
 *
 * @module Task (gulp clean)
 * @extends Gulp
 * @extends Path
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, path, config, plugins, functions){
	/**
	 * Tarea para limpiar imagenes
	 * (gulp clean:img)
	 */
	gulp.task('clean:img', function () {
		return gulp.src(path.dest.img, { read: false })
			.pipe(plugins.rimraf({ force: true }));
	});

	/**
	 * Tarea para limpiar fuentes
	 * (gulp clean:fonts)
	 */
	gulp.task('clean:fonts', function () {
		return gulp.src(path.dest.fonts, { read: false })
			.pipe(plugins.rimraf({ force: true }));
	});

	/**
	 * Tarea para limpiar archivos js
	 * (gulp clean:js)
	 */
	gulp.task('clean:js', function () {
		return gulp.src(path.dest.js, { read: false })
			.pipe(plugins.rimraf({ force: true }));
	});

	/**
	 * Tarea para limpiar archivos css
	 * (gulp clean:css)
	 */
	gulp.task('clean:css', function () {
		return gulp.src(path.dest.css, { read: false })
			.pipe(plugins.rimraf({ force: true }));
	});

	/**
	 * Tarea principal
	 * (gulp clean)
	 */
	gulp.task('clean', function (callback) {
		plugins.runSequence('clean:img', 'clean:fonts', 'clean:js', 'clean:css',  callback);
	});

}

module.exports = Task;