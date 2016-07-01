/**
 * Tarea para ejecutar el servidor express y el watcher
 *
 * @module Task (gulp watch)
 * @extends Gulp
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, pathFiles, plugins, functions, local){
  var runTasks = function (objWatchers) {
    /**
     * Tarea para ejecutar el browserSync, una vez ejecutada la tarea nodemon
     * (gulp browserSync)
     */
    gulp.task('browserSync', function () {
      plugins.browserSync({
        proxy: local.BASE_HOST
      });
    });

    /**
     * Tarea principal
     * (gulp watch)
     */

    //gulp.task('watch', function () {
    gulp.task('watch', ['server', 'browserSync'], function () {
      gulp.watch([pathFiles.frontend.views + '/**/*.jade'], objWatchers.html);
      gulp.watch([pathFiles.frontend.styles + '/**/*.styl'], ['css', plugins.browserSync.reload]);
      gulp.watch([pathFiles.frontend.scripts + '/**/*.coffee'], ['js', plugins.browserSync.reload]);
    });
  }

  return {
    run : runTasks
  }

}

module.exports = Task;
