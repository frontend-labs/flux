/**
 * Tarea para copiar archivos de la carpeta frontend a la carpeta pública
 *
 * @module Task (gulp copy)
 * @extends Gulp
 * @extends Path
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, pathFiles, plugins, functions){
  //----------------------------------------------------
  var pathCopyImgFiles = [
    pathFiles.frontend.images + '/**/**/*.*',
    '!' + pathFiles.frontend.images + '/_**/**/*.*',
    '!' + pathFiles.frontend.images + '/**/_**/*.*',
    '!' + pathFiles.frontend.images + '/**/**/_*.*'
  ]
  var pathCopyFontsFiles = [
    pathFiles.frontend.fonts + '/**/*.*',
    '!' + pathFiles.frontend.fonts + '/_**/*.*'
  ]
  //----------------------------------------------------

  var runTasks = function () {
    /**
     * Tarea para copiar imagenes
     * (gulp copy:img)
     */
    gulp.task('copy:img', function() {
      return gulp.src(pathCopyImgFiles, { base : pathFiles.frontend.source })
        .pipe(plugins.if(functions.isProduction, plugins.imagemin({
          verbose: true,
          plugins: [
            plugins.imageminPNG({optimizationLevel: 3}),
            plugins.imageminJPG({progressive: true}),
            plugins.imageminSVG()
          ]
        })))
        .pipe(plugins.if(functions.isGzip, plugins.gzip({ append: false  })))
        .pipe(gulp.dest(pathFiles.dest.serverFiles + pathFiles.dest.static));
    });

    /**
     * Tarea para copiar sprites de imagenes
     * (gulp copy:img:sprites)
     */
    gulp.task('copy:img:sprites', function() {
      return gulp.src(pathFiles.frontend.images + '/*_sprite.png', { base : pathFiles.frontend.source })
        .pipe(plugins.if(functions.isGzip, plugins.gzip({ append: false  })))
        .pipe(gulp.dest(pathFiles.dest.serverFiles + pathFiles.dest.static));
    });

    /**
     * Tarea para copiar fuentes
     * (gulp copy:fonts)
     */
    gulp.task('copy:fonts', function() {
      return gulp.src(pathCopyFontsFiles, { base : pathFiles.frontend.source })
        .pipe(plugins.if(functions.isGzip, plugins.gzip({ append: false  })))
        .pipe(gulp.dest(pathFiles.dest.serverFiles + pathFiles.dest.static));
    });

    /**
     * Tarea para copiar librerías javascript con extensión *.js
     * (gulp copy:js:libs)
     *
     * Hay casos donde las librerías que no están registradas en bower, se deben copian al proyecto
     * con extensión .js (debido a que genera problemas al transformar a sintaxis coffee)
     */
    gulp.task('copy:js:libs', function () {
      return gulp.src(pathFiles.frontend.scripts + '/libs/*.js')
        .pipe(plugins.if(functions.isProduction, plugins.uglify({
          mangle  : false,
          compress: {
            drop_console: true
          }
        })))
        .pipe(plugins.if(functions.isGzip, plugins.gzip({ append: false  })))
        .pipe(gulp.dest(pathFiles.dest.js + '/libs'));
    });

    /**
     * Tarea principal
     * (gulp copy)
     */
    gulp.task('copy', function (cb) {
      plugins.runSequence('copy:img', 'copy:img:sprites', 'copy:fonts', 'copy:js:libs', cb);
    });
  }

  return {
    run : runTasks
  }
}


module.exports = Task;
