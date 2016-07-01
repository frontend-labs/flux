/**
 * Tarea para compilar archivos .styl
 *
 * @module Task (gulp css)
 * @extends Gulp
 * @extends Path
 * @extends Plugins
 * @extends Functions
 * @author Victor Sandoval
 */

function Task(gulp, pathFiles, plugins, functions){

  var pathStylesFiles = [
    pathFiles.frontend.styles + '/**/*.styl',
    '!' + pathFiles.frontend.styles + '/_**/**/*.styl'
  ]
  var processors = [
    plugins.autoprefixer(),
    plugins.lost()
  ];

  var runTasks = function () {
    /**
     * Tarea usada por el gulp watch
     * (gulp css)
     *
     * Utiliza plugins como
     * Rupture      : Proporciona mixins para los breakpoints en css
     * Lost         : Proporciona mixins para un sistema de grillas
     * PostCSS      : Proporciona superpoderes a CSS
     * CSSWring     : Plugin de PostCSS para minificar el css con la rutas mapeadas
     * Autoprefixer : Plugin para agregar prefijos para los diferentes motores de navegador
   */
    gulp.task('css', function () {
      if (functions.isProduction()) {
        processors.push(plugins.csswring)
      }
      return gulp.src(pathStylesFiles)
        .pipe(plugins.stylus({
          use: [plugins.rupture()]
        }))
        .on('error', functions.errorHandler)
        .pipe(plugins.postcss(processors))
        .pipe(plugins.urlVersion({lastcommit: true}))
        .pipe(plugins.if(functions.isGzip, plugins.gzip({ append: false  })))
        .pipe(gulp.dest(pathFiles.dest.css))
        .on('end', functions.successHandler);
    });


    /**
     * Tarea principal
     * (gulp css:all)
     */
    gulp.task('css:all', function(cb) {
      plugins.runSequence('clean:css', 'css', cb);
    });
  }

  return {
    run : runTasks
  }
}

module.exports = Task;
