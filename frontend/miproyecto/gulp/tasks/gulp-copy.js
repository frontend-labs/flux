/*!!
*
* Tareas para copiar archivos
*
* tarea principal: gulp copy
*/

function Task(gulp, path, options, plugins, settings) {

    gulp.task('copy:js:libs', function () {
        gulp.src(path.copy.js.libs.src, { base: path.copy.js.libs.base })
            .pipe(plugins.if(settings.config.prod, plugins.uglify(options.concat.js.uglify)))
            .pipe(gulp.dest(path.copy.js.libs.dest));
    });

    gulp.task('copy:js', ['copy:js:libs'], function () {
        return;
    });

    gulp.task('copy:fonts', function () {
        gulp.src(path.copy.fonts.src, { base : path.src.static.fonts })
            .pipe(gulp.dest(path.copy.fonts.dest));
    });

    gulp.task('copy:img', function () {
        gulp.src(path.copy.images.source.src, { base : path.src.static.images })
            .pipe(plugins.if(settings.config.prod, plugins.imagemin(options.imagemin.general)))
            .pipe(gulp.dest(path.copy.images.source.dest));
    });

    gulp.task('copy:img:sprites', function () {
        gulp.src(path.copy.images.sprites.src, { base : path.src.static.images })
            .pipe(plugins.if(settings.config.prod, plugins.imagemin(options.imagemin.general)))
            .pipe(gulp.dest(path.copy.images.sprites.dest));
    });

    gulp.task('copy', function (cb) {
        plugins.runSequence('copy:js', 'copy:img', 'copy:fonts', cb);
    });
}

module.exports = Task;
