/*!!
*
* Tareas para generar fuente de iconos
*
* tarea principal: gulp icons
*/

function Task(gulp, path, options, plugins, settings) {

    gulp.task('compileIcons', function(){
        gulp.src([path.icons.default.src.svgs])
            .pipe(plugins.iconfont(options.icons.default.generator))
            .on('codepoints', function(codepoints, options) {
                gulp.src(path.icons.default.src.template)
                .pipe(plugins.consolidate('lodash', {
                    glyphs: codepoints,
                    fontName: 'iconFonts',
                    className: 'icon'
                }))
                .pipe(gulp.dest(path.icons.default.dest.stylus));
            })
            .pipe(gulp.dest(path.icons.default.dest.fonts));
    });

    gulp.task('icons', function() {
        plugins.runSequence('compileIcons', 'copy:fonts', 'styles', function(){
            console.log('Solo Fuente de iconos.');
        });
    });

}

module.exports = Task;
