/**
 * Tarea para compilar y validar archivos .coffee
 *
 * @module Task (gulp js)
 * @extends Gulp
 * @extends Path
 * @extends Plugins
 * @extends Functions
 * @author Victor Sandoval
 */

function Task(gulp, pathFiles, plugins, functions) {
  var fn = {
    compiler: function(pathSrc, pathdest, enabledRecursive){
      return gulp.src(pathSrc)
        .pipe(plugins.if(enabledRecursive, plugins.recursiveConcat({ extname: '.js' })))
        .pipe(plugins.coffee({ bare: true }))
        .pipe(plugins.jshint(pathFiles.frontend.config + '/.jshintrc'))
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'))
        .on('error', functions.errorHandler)
        .pipe(plugins.if(functions.isProduction, plugins.uglify({
          mangle  : true,
          compress: {
            drop_console: true
          }
        })))
        .pipe(plugins.if(functions.isGzip, plugins.gzip({ append: false  })))
        .pipe(gulp.dest(pathdest))
        .on('end', functions.successHandler);
    }
  }

  var runTasks = function () {
    /**
     * Tarea para compilar archivos (.coffee) de librerías usadas para el proyecto
     * (gulp js:compile:libs)
     */
    gulp.task('js:compile:libs', function () {
      return gulp.src(pathFiles.frontend.scripts + '/libs/**/*.coffee', { base : pathFiles.frontend.scripts })
      .pipe(plugins.coffee({bare: true}).on('error', functions.errorHandler))
      .pipe(plugins.if(functions.isProduction, plugins.uglify({
        mangle  : true,
        compress: {
          drop_console: false
        }
      })))
      .pipe(plugins.if(functions.isGzip, plugins.gzip({ append: false  })))
      .pipe(gulp.dest(pathFiles.dest.js));
    });

    /**
     * Tarea para compilar archivos (.coffee) de los modulos del proyecto
     * (gulp js:concat)
     */
    gulp.task('js:compile', function () {
      return fn.compiler(pathFiles.frontend.scripts + '/sections/**/*.coffee', pathFiles.dest.js + '/sections', true)
    });

    /**
     * Tarea para validar complejidad de código en los modulos js
     * (gulp js:complexity)
     */
    gulp.task('js:complexity', function () {
      return gulp.src(pathFiles.frontend.scripts + '/sections/**/*.coffee')
        .pipe(plugins.coffee({ bare: true }))
        .pipe(plugins.complexity());
    });

    /**
     * Tarea usada por el gulp watch
     * (gulp js)
     */
    gulp.task('js', function (cb) {
      plugins.runSequence('js:compile:libs', 'js:compile', cb);
    });

    /**
     * Tarea principal
     * (gulp js:all)
     */
    gulp.task('js:all', function (cb) {
      plugins.runSequence('clean:js', 'js:compile:libs', 'js:compile', 'copy:js:libs', cb);
    });
  };

  var watcher = function(chunk){
    /*var basePath          = plugins.path.dirname(chunk.path);
    var parentPath        = basePath  + "/*.coffee";
    var pathRelative      = plugins.path.relative(pathFiles.frontend.scripts, basePath);
    var enabledRecursive  = true;

    if (plugins.path.dirname(pathRelative) === "libs") {
      enabledRecursive = false;
      parentPath = chunk.path;
    }

    fn.compiler(parentPath, pathFiles.dest.js + '/' + pathRelative, enabledRecursive);
    plugins.browserSync.reload;*/
  }

  return {
    run : runTasks,
    watcher: watcher
  };
}

module.exports = Task;
