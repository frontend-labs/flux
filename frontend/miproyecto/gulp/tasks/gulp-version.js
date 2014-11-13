/*!!
*
* Tareas para changelog, tag
*
* tarea principal: gulp version
*/

function Task(gulp, path, options, plugins, settings) {

    gulp.task('log', function () {
        return settings.changelog({
            repository: settings.package.repository.url,
            version: settings.package.version
        }, function(err, log) {
            settings.fs.writeFileSync('CHANGELOG.md', log, 'utf8');
        });
    });

    gulp.task('bump', function(){
        return gulp.src([path.src.folder + 'package.json', path.src.folder + 'bower.json'])
        .pipe(plugins.bump())
        .pipe(gulp.dest(path.src.folder))
        .pipe(plugins.filter('package.json'))
        .pipe(plugins.tagVersion());
    });

    gulp.task('version', function (cb) {
        plugins.runSequence(['log', 'bump'], cb);
    });

}

module.exports = Task;
