/**
 * Tarea para generar archivo sprite de imagenes png
 *
 * @module Task (gulp sprites)
 * @extends Gulp
 * @extends Path
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, path, config, plugins, functions){

  /**
   * Tarea para compilar archivos png y tranformarlos a un sprite
   * (gulp sprites:compile)
   *
   * Genera un archivo img y un .styl
   */
  gulp.task('sprites:compile', function () {
    var spriteData = gulp.src(path.frontend.images + '/_sprite/*.png')
      .pipe(plugins.spritesmith({
        algorithm: 'binary-tree',
        imgName: 'main_sprite.png',
        cssName: 'main_sprite.styl',
        cssTemplate : path.frontend.images + '/_sprite/_template/stylus.template.handlebars'
      }));

    // Genera archivo sprite
    var imgStream = spriteData.img.pipe(gulp.dest(path.frontend.images));

    // Genera archivo .styl
    var cssStream = spriteData.css.pipe(gulp.dest(path.frontend.pre_css + '/_helpers/'));
    return spriteData;
  });

  /**
   * Tarea principal
   * (gulp sprites)
   */
  gulp.task('sprites', function(cb){
    plugins.runSequence('sprites:compile', 'copy:img:sprites', 'css', cb)
  });


}

module.exports = Task;