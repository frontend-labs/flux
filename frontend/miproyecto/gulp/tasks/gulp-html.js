/*!!
*
* Tareas para generar .html y .cshtml
*
* tarea principal: gulp html
*/
function Task(gulp, path, options, plugins, settings) {

    gulp.task('html:frontend', function() {
        return gulp.src(path.jade.frontend.src)
        .pipe(plugins.jade(options.jade.frontend))
        .pipe(plugins.rename(options.jade.frontend.rename))
        .pipe(gulp.dest(path.jade.frontend.dest))
    });


    gulp.task('html:backend', function() {
        return gulp.src(path.jade.backend.src)
        .pipe(plugins.jade(options.jade.backend))
        .pipe(plugins.rename(options.jade.backend.rename))
        .pipe(gulp.dest(path.jade.backend.dest))
    });


    gulp.task('html', function(cb) {
        plugins.runSequence('html:frontend', 'html:backend', cb);
    });

}

module.exports = Task;
