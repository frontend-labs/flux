/**
 * Tarea para compilar archivos .styl
 *
 * @module Task (gulp styles)
 * @extends Gulp
 * @extends Path
 * @extends Config
 * @extends Plugins
 * @extends Functions
 * @author Victor Sandoval
 */

function Task(gulp, path, config, plugins, functions){

  pathStylesFiles = [
    path.frontend.pre_css + '/**/*.styl',
    '!' + path.frontend.pre_css + '/_**/*.styl',
    '!' + path.frontend.pre_css + '/**/_**/*.styl',
    '!' + path.frontend.pre_css + '/**/**/_**/*.styl'
  ]

  /**
   * Tarea usada por el gulp watch
   * (gulp styles)
   *
   * Utiliza plugins como
   * Rupture : Proporciona mixins para los breakpoints en css
   * Jeet    : Proporciona mixins para un sistema de grillas
   * Nib     : Proporciona mixins cross-browser para propiedades CCS3
   */
  gulp.task('styles', function () {
    return gulp.src(pathStylesFiles, { base : path.frontend.pre_css })
      .pipe(plugins.stylus({
        compress: config.prod,
        use     : [plugins.rupture(), plugins.jeet(), plugins.nib()],
        import  : ['jeet','nib'] //Rupture no es necesario, lo incluye en su librería
      }))
      .on('error', functions.errorHandler)
      .pipe(plugins.urlVersion({lastcommit: true}))
      .pipe(gulp.dest(path.dest.css))
      .on('end', functions.successHandler);
  });


  /**
   * Tarea principal
   * (gulp styles:all)
   */
  gulp.task('styles:all', function() {
    plugins.runSequence('clean:css', 'styles');
  });
}

module.exports = Task;