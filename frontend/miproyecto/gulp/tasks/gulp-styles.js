/*!!
*
* Tarea para generar, prefixear y minimizar Css
*
* tarea principal: gulp stylus
*/

function Task(gulp, path, options, plugins, settings) {

    gulp.task('styles', function () {
        return gulp.src(path.stylus.default.src)
        .pipe(plugins.stylus(options.stylus.default))
        .pipe(plugins.if(settings.config.prod, plugins.cssUrlVersioner(options.stylus.default.versioner)))
        .pipe(plugins.autoprefixer(options.stylus.default.autoprefixer))
        .pipe(plugins.cssshrink())
        .pipe(plugins.if(settings.config.prod, plugins.minifyCSS(options.stylus.default.minify)))
        //.pipe(plugins.debug())
        .pipe(gulp.dest(path.stylus.default.dest))
        .pipe(plugins.size(options.stylus.default.size));
    });

}

module.exports = Task;
