/*!!
*
* Tareas para generar sprites png
*
* tarea principal: gulp sprites
*/

function Task(gulp, path, options, plugins, settings) {

    gulp.task('sprites', function () {
        var mainData = gulp.src(path.sprites.mainSprite.src.images)
            .pipe(plugins.spritesmith(options.sprites.mainSprite));

        mainData.img.pipe(gulp.dest(path.sprites.mainSprite.dest.image));
        mainData.css.pipe(gulp.dest(path.sprites.mainSprite.dest.stylus));

        var secondData = gulp.src(path.sprites.secondSprite.src.images)
            .pipe(plugins.spritesmith(options.sprites.secondSprite));

        secondData.img.pipe(gulp.dest(path.sprites.secondSprite.dest.image));
        secondData.css.pipe(gulp.dest(path.sprites.secondSprite.dest.stylus));

        var aladinoRunningData = gulp.src(path.sprites.aladinoRunning.src.images)
            .pipe(plugins.spritesmith(options.sprites.aladinoRunning));

        aladinoRunningData.img.pipe(gulp.dest(path.sprites.aladinoRunning.dest.image));
        aladinoRunningData.css.pipe(gulp.dest(path.sprites.aladinoRunning.dest.stylus));

        gulp.start('copy:img:sprites');

    });

}

module.exports = Task;
