/*!!
*
* Tareas extra para .net
*
* tarea principal: gulp backend
*/

function Task(gulp, path, options, plugins, settings) {

    gulp.task('copy:backend:cshtml:views', function () {
        return gulp.src(path.copy.backend.cshtml.src.views, { base: path.dest.folder })
            .pipe(gulp.dest(path.copy.backend.cshtml.dest.views));
    });

    gulp.task('copy:backend:cshtml:layouts', function () {
        return gulp.src(path.copy.backend.cshtml.src.layouts, { base: path.dest.folder })
            .pipe(gulp.dest(path.copy.backend.cshtml.dest.layouts));
    });

    gulp.task('copy:backend:cshtml', function (cb) {
        plugins.runSequence(
            'copy:backend:cshtml:views',
            'copy:backend:cshtml:layouts',
            cb);
    });

    gulp.task('copy:backend:static', function () {
        return gulp.src(path.copy.backend.static.src, {base: path.dest.folder})
            .pipe(gulp.dest(path.copy.backend.static.dest));
    });


    gulp.task('copy:backend:resources', function () {
        return gulp.src(path.copy.backend.resources.src)
            .pipe(gulp.dest(path.copy.backend.resources.dest));
    });


    gulp.task('clean:backend', function () {
        return gulp.src(path.clean.backend.html, options.clean.general.src)
        .pipe(plugins.rimraf(options.clean.general.plugin));
    });

    gulp.task('clean:zip', function () {
        return gulp.src(path.clean.zip.backend, options.clean.general.src)
        .pipe(plugins.rimraf(options.clean.general.plugin));
    });

    gulp.task('zip:backend', function () {
        return gulp.src(path.zip.backend.src)
            .pipe(plugins.zip(options.zip.backend.file))
            .pipe(gulp.dest(path.zip.backend.dest));
    });

    gulp.task('email:backend', function () {
        options.email.backend.form.attachment = '@../../src/' + options.zip.backend.file;

        return gulp.src(path.email.backend.src)
        .pipe(plugins.email(options.email.backend, function(data, error){
            console.log(data);
            })
        );
    });

    gulp.task('backend', ['clean:zip'], function (cb) {
        plugins.runSequence(
            'copy:backend:cshtml',
            'copy:backend:static',
            'clean:backend',
            'copy:backend:resources',
            'zip:backend',
            'email:backend',
            cb);
    });

}

module.exports = Task;
