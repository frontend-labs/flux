/*!!
*
* Tareas para correr un servidor local con browserSync
*
* tarea principal: gulp watch
*/

function Task(gulp, path, options, plugins, settings) {

    var browserSync = settings.browserSync;
    var reload = browserSync.reload;
    var coffeeTasks = ['js', reload],
        jadeTasks = ['html:frontend', reload],
        stylusTasks = ['styles', reload];

    gulp.task('server', function () {
        return browserSync({
            server: {
                baseDir: path.dest.folder
            },
            browser: options.browserSync.browser
        });
    });

    gulp.task('watch', function () {

        gulp.start('server');

        gulp.watch(path.watch.jade, jadeTasks);
        gulp.watch(path.watch.coffee, coffeeTasks);
        gulp.watch(path.watch.stylus, stylusTasks);
    });

}

module.exports = Task;
