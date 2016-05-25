/**
 * Tarea para compilar y validar archivos .coffee
 *
 * @module Task (gulp js)
 * @extends Gulp
 * @extends Path
 * @extends Config
 * @extends Plugins
 * @extends Functions
 * @author Victor Sandoval
 */

function Task(gulp, path, config, plugins, functions){

  /**
   * Tarea para compilar archivos (.coffee) de librerías usadas para el proyecto
   * (gulp js:compile:libs)
   */
  gulp.task('js:compile:libs', function() {
    return gulp.src(path.frontend.pre_js + '/libs/**/*.coffee', { base : path.frontend.pre_js })
    .pipe(plugins.coffee({bare: true}).on('error', functions.errorHandler))
    .pipe(gulp.dest(path.dest.js));
  });

  /**
   * Tarea para compilar archivos (.coffee) de los modulos del proyecto
   * (gulp js:compile)
   */
  gulp.task('js:compile', function(){
    return gulp.src(path.frontend.pre_js + '/sections/**/*.coffee')
      .pipe(plugins.recursiveConcat({ extname: '.coffee' }))
      .pipe(plugins.coffee({ bare: true }))
      .pipe(plugins.jshint(path.frontend.config + '/.jshintrc'))
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'))
      .on('error', functions.errorHandler)
      .pipe(plugins.if(config.prod, plugins.uglify({
        mangle  : true, 
        compress: {
          drop_console: true
        }
      })))
      .pipe(gulp.dest(path.dest.js + '/sections'))
      .on('end', functions.successHandler);
  });


  /**
   * Tarea para validar complejidad de código en los modulos js
   * (gulp js:complexity)
   */
  gulp.task('js:complexity', function(){
    return gulp.src(path.frontend.pre_js + '/views/**/*.coffee')
      .pipe(plugins.coffee({ bare: true }))
      .pipe(plugins.complexity());
  });

  /**
   * Tarea usada por el gulp watch
   * (gulp js)
   */
  gulp.task('js', function(cb){
    plugins.runSequence('js:compile:libs', 'js:compile', cb)
  });

  /**
   * Tarea principal
   * (gulp js:all)
   */
  gulp.task('js:all', function(cb){
    plugins.runSequence('clean:js', 'js:compile:libs', 'js:compile', 'copy:js:libs', cb)
  });
}

module.exports = Task;