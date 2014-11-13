/*!!
*
* Tareas para generar fuentes de texto
*
* tarea principal: gulp fonts
*/

function Task(gulp, path, options, plugins, settings) {

    gulp.task('compileFonts', function(){
        settings.fs.readdir(path.src.static.fonts, function(err, files) {
            if (err) throw err;
            var dirList = files.filter(function(file) { return (/^[^_]*$/g).test(file); });
            gulp.src(path.fonts.default.src.template)
            .pipe(plugins.consolidate('lodash', { dirList: dirList }))
            .pipe(gulp.dest(path.fonts.default.dest.stylus));

        })
    });

    gulp.task('fonts', function() {
        plugins.runSequence('compileFonts', 'styles', function(){
            console.log('Solo Fuente de letras.');
        });
    });

}

module.exports = Task;
