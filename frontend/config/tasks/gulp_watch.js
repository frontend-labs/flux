/**
 * Tarea para ejecutar el watcher
 *
 * @module Task (gulp watch)
 * @extends Gulp
 * @extends Path
 * @extends Config
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, path, config, plugins, functions){

  /**
   * Tarea para incializar el browserSync
   * (gulp server)
   */
  gulp.task('browserSync', function () {
    plugins.browserSync({
      proxy: "http://localhost:" + config.port + "/"
    });
  });


  /**
   * Tarea principal
   * (gulp watch)
   */
  gulp.task('watch', ['server', 'browserSync'], function () {
    gulp.watch([path.frontend.pre_html + '/**/*.jade'], ['', plugins.browserSync.reload]);
    gulp.watch([path.frontend.pre_css + '/**/*.styl'], ['css', plugins.browserSync.reload]);
    gulp.watch([path.frontend.pre_js + '/**/*.coffee'], ['js', plugins.browserSync.reload]);
  });

}

module.exports = Task;