/**
 * Tarea para compilar archivos .jade 
 *
 * @module Task (gulp html)
 * @extends Gulp
 * @extends Path
 * @extends Config
 * @extends Plugins
 * @extends Functions
 * @author Victor Sandoval
 */

function Task(gulp, path, config, plugins, functions){

  var pathJadeFiles = [
    path.frontend.pre_html + '/*.jade',
    path.frontend.pre_html + '/**/*.jade',
    '!' + path.frontend.pre_html + '/_**/*.jade',
    '!' + path.frontend.pre_html + '/**/_**/*.jade',
    '!' + path.frontend.pre_html + '/**/_*.jade'
  ]

  /**
   * Tarea principal
   * (gulp html)
   */
  gulp.task('html', function() {
    return gulp.src(pathJadeFiles)
      .pipe(plugins.jade({
        pretty: true,
        locals: {
          baseUrl   : "/",
          staticUrl : "/",
          elementUrl: "/",
          version   : new Date().getTime(),
          section   : "default"
        }
      }).on('error', functions.errorHandler))
      .pipe(gulp.dest(path.dest.html))
  });

}

module.exports = Task;