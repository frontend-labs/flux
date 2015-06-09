/**
 * GULP WATCH: Tarea para levantar el servidor express y ejecutar el watcher
 * @author Victor Sandoval
 * @constructor
 */
function Task(gulp, path, config, plugins){

	gulp.task('nodemon', function (cb) {
		var called = false;
		return plugins.nodemon({
			script: path.frontend.config + '/server.js'
		})
		.on('start', function () {
			if (!called) {
				called = true;
				cb();
			}
		})
		.on('restart', function () {
			setTimeout(function () {
				plugins.browserSync.reload({
					stream: false
				});
			}, 1000);
		});
	});

	gulp.task('server', ['nodemon'], function () {
		plugins.browserSync({
			proxy: "http://localhost:" + config.port + "/"
		});
	});

	gulp.task('watch', ['server'], function () {
		gulp.watch([path.frontend.jade + '/**/*.jade'], ['', plugins.browserSync.reload]);
		gulp.watch([path.frontend.stylus + '/**/*.styl'], ['styles', plugins.browserSync.reload]);
		gulp.watch([path.frontend.coffee + '/**/*.coffee'], ['js', plugins.browserSync.reload]);
	});

}

module.exports = Task;