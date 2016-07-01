/**
 * Tarea para eliminar o limpiar los archivos generados por las tareas gulp
 *
 * @module Task (gulp clean)
 * @extends Gulp
 * @extends Path
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, pathFiles, plugins, functions){
  var runTasks = function () {
    /**
     * Tarea para limpiar imagenes
     * (gulp clean:img)
     */
    gulp.task("clean:img", function (cb) {
      return plugins.del([pathFiles.dest.img], { force: true }, cb);
    });

    /**
     * Tarea para limpiar fuentes
     * (gulp clean:fonts)
     */
    gulp.task("clean:fonts", function (cb) {
      return plugins.del([pathFiles.dest.fonts], { force: true }, cb);
    });

    /**
     * Tarea para limpiar archivos js
     * (gulp clean:js)
     */
    gulp.task("clean:js", function (cb) {
      return plugins.del([pathFiles.dest.js], { force: true }, cb);
    });

    /**
     * Tarea para limpiar archivos css
     * (gulp clean:css)
     */
    gulp.task("clean:css", function (cb) {
      return plugins.del([pathFiles.dest.css], { force: true }, cb);
    });

    /**
     * Tarea principal
     * (gulp clean)
     */
    gulp.task("clean", function(cb){
      plugins.runSequence("clean:img", "clean:fonts", "clean:js", "clean:css", cb);
    });
  }

  return {
    run : runTasks
  }
}

module.exports = Task;
