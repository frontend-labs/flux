/**
 * GULP CLEAN: Tarea para eliminar o limpiar los archivos generados por las tareas gulp
 * @author Victor Sandoval
 * @constructor
 */
function Task(gulp, path, config, plugins, functions){

	gulp.task('clean:img', function () {
		return gulp.src(path.dest.img, { read: false })
			.pipe(plugins.rimraf({ force: true }));
	});

	gulp.task('clean:fonts', function () {
		return gulp.src(path.dest.fonts, { read: false })
			.pipe(plugins.rimraf({ force: true }));
	});

	gulp.task('clean:js', function () {
		return gulp.src(path.dest.js, { read: false })
			.pipe(plugins.rimraf({ force: true }));
	});

	gulp.task('clean:css', function () {
		return gulp.src(path.dest.css, { read: false })
			.pipe(plugins.rimraf({ force: true }));
	});

	gulp.task('clean', function (callback) {
		plugins.runSequence('clean:img', 'clean:fonts', 'clean:js', 'clean:css',  callback);
	});

}

module.exports = Task;