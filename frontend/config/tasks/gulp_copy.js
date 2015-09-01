/**
 * Tarea para copiar archivos de la carpeta frontend a la carpeta pública
 *
 * @module Task (gulp copy)
 * @extends Gulp
 * @extends Path
 * @extends Config
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, path, config, plugins, functions){
  //----------------------------------------------------
  var pathCopyImgFiles = [
    path.frontend.images + '/**/**/*.*',
    '!' + path.frontend.images + '/_**/**/*.*',
    '!' + path.frontend.images + '/**/_**/*.*',
    '!' + path.frontend.images + '/**/**/_*.*'
  ]
  var pathCopyFontsFiles = [
    path.frontend.fonts + '/**/*.*',
    '!' + path.frontend.fonts + '/_**/*.*'
  ]
  //----------------------------------------------------

  /**
   * Tarea para copiar imagenes
   * (gulp copy:img)
   */
  gulp.task('copy:img', function() {
    return gulp.src(pathCopyImgFiles, { base : path.frontend.source })
      .pipe(plugins.if(config.prod, plugins.imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [
          plugins.imageminPNG({optimizationLevel: 3}),
          plugins.imageminJPG({progressive: true}),
          plugins.imageminGIF({interlaced: true}),
          plugins.imageminSVG()
        ]
      })))
      .pipe(gulp.dest(path.dest.serverFiles + path.dest.static));
  });

  /**
   * Tarea para copiar sprites de imagenes
   * (gulp copy:img:sprites)
   */
  gulp.task('copy:img:sprites', function() {
    return gulp.src(path.frontend.images + '/*_sprite.png', { base : path.frontend.source })
      .pipe(plugins.if(config.prod, plugins.imagemin({
        progressive: true,
        use: [ plugins.imageminPNG({optimizationLevel: 3}) ]
      })))
      .pipe(gulp.dest(path.dest.serverFiles + path.dest.static));
  });

  /**
   * Tarea para copiar fuentes
   * (gulp copy:fonts)
   */
  gulp.task('copy:fonts', function() {
    return gulp.src(pathCopyFontsFiles, { base : path.frontend.source })
      .pipe(gulp.dest(path.dest.serverFiles + path.dest.static));
  });

  /**
   * Tarea para copiar librerías javascript con extensión *.js
   * (gulp copy:js:libs)
   *
   * Hay casos donde las librerías que no están registradas en bower, se deben copian al proyecto
   * con extensión .js (debido a que genera problemas al transformar a sintaxis coffee)
   */
  gulp.task('copy:js:libs', function () {
    return gulp.src(path.frontend.pre_js + '/libs/*.js')
      .pipe(gulp.dest(path.dest.js + '/libs'));
  });
  
  /**
   * Tarea principal
   * (gulp copy)
   */
  gulp.task('copy', function(cb){
    plugins.runSequence('copy:img', 'copy:img:sprites', 'copy:fonts', 'copy:js:libs', cb)
  });

}


module.exports = Task;