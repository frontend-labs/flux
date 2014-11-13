/*!!
*
* Tareas individuales para limpiar los archivos generados
*
* tarea principal: gulp clean
*/

function Task(gulp, path, options, plugins, settings) {

    gulp.task('clean:html:frontend', function () {
        return gulp.src(path.clean.html.frontend, options.clean.general.src)
        .pipe(plugins.rimraf(options.clean.general.plugin));
    });

    gulp.task('clean:html:backend', function () {
        return gulp.src(path.clean.html.backend, options.clean.general.src)
        .pipe(plugins.rimraf(options.clean.general.plugin));
    });

    gulp.task('clean:html', function (cb) {
        plugins.runSequence([
            'clean:html:frontend',
            'clean:html:backend'
            ], cb);
    });

    gulp.task('clean:styles', function () {
        return gulp.src(path.clean.styles.default, options.clean.general.src)
        .pipe(plugins.rimraf(options.clean.general.plugin));
    });

    gulp.task('clean:images', function () {
        return gulp.src(path.clean.images.default, options.clean.general.src)
        .pipe(plugins.rimraf(options.clean.general.plugin));
    });

    gulp.task('clean:fonts', function () {
        return gulp.src(path.clean.fonts.default, options.clean.general.src)
        .pipe(plugins.rimraf(options.clean.general.plugin));
    });

    gulp.task('clean:js:scripts', function () {
        return gulp.src(path.clean.js.scripts, options.clean.general.src)
        .pipe(plugins.rimraf(options.clean.general.plugin));
    });

    gulp.task('clean:js', function (cb) {
        plugins.runSequence('clean:js:scripts', cb);
    });

    gulp.task('clean', function (cb) {
        plugins.runSequence(['clean:html', 'clean:styles', 'clean:images', 'clean:fonts', 'clean:js'], cb);
    });

}

module.exports = Task;
