/**
 * Tarea para generar archivo sprite de imagenes png
 *
 * @module Task (gulp sprites)
 * @extends Gulp
 * @extends Path
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, pathFiles, plugins, functions){

  var runTasks = function () {
    /**
     * Tarea para compilar archivos png y tranformarlos a un sprite
     * (gulp sprites:compile)
     *
     * Genera un archivo img y un .styl
     */
    gulp.task('sprites:compile', function () {
      var spriteData = gulp.src(pathFiles.frontend.images + '/_sprite/main_sprite/*.png')
        .pipe(plugins.spritesmith({
          algorithm: 'binary-tree',
          imgPath: '../../../img/main_sprite.png',
          imgName: 'main_sprite.png',
          cssName: 'main_sprite.styl'
        }));

      // Genera archivo sprite
      var imgStream = spriteData.img.pipe(gulp.dest(pathFiles.frontend.images + '/'));

      // Genera archivo .styl
      var cssStream = spriteData.css.pipe(gulp.dest(pathFiles.frontend.styles + '/_partials/mixins'));
      return spriteData;
    });

    /**
     * Tarea principal
     * (gulp sprites)
     */
    gulp.task('sprites', function (cb) {
      plugins.runSequence('sprites:compile', 'copy:img:sprites', 'css', cb);
    });
  }

  return {
    run : runTasks
  }
}

module.exports = Task;