/**
 * Tarea para ejecutar el servidor express y el watcher
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
   * Tarea para ejecutar el servidor express mediante el script server.js
   * (gulp nodemon)
   */
  gulp.task('nodemon', function () {
    var called = false;
    return plugins.nodemon({
      script: 'config/server.js'
    })
    .on('start', function () {
      if (!called) {
        called = true;
      }
    })
    .on('restart', function () {
      setTimeout(function () {
        plugins.browserSync.reload({
          stream: false
        });
      }, 1000)
    })
    .on('crash', function(){
      plugins.notifier.notify({
        title   : 'Error en la tarea: gulp watch',
        message : 'Se interrumpió el proceso por algún motivo.'
      });
    });
  });

  /**
   * Tarea para ejecutar el browserSync, una vez ejecutada la tarea nodemon
   * (gulp server)
   */
  gulp.task('server', ['nodemon'], function () {
    plugins.browserSync({
      proxy: "http://localhost:" + config.port + "/"
    });
  });

  /**
   * Tarea principal
   * (gulp watch)
   */
  gulp.task('watch', ['server'], function () {
    gulp.watch([path.frontend.pre_html + '/**/*.jade'], ['', plugins.browserSync.reload]);
    gulp.watch([path.frontend.pre_css + '/**/*.styl'], ['css', plugins.browserSync.reload]);
    gulp.watch([path.frontend.pre_js + '/**/*.coffee'], ['js', plugins.browserSync.reload]);
  });

}

module.exports = Task;