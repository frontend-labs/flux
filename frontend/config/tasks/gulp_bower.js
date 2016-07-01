/**
 * Tarea para manejar librerias de bower
 *
 * @module Task (gulp bower)
 * @extends Gulp
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, pathFiles, plugins, functions){
  var runTasks = function () {

    /**
     * Tarea para instalar las librerías de bower
     * (gulp bower:install)
     */
    gulp.task("bower:install", function(cb) {
      return plugins.bower({
        cmd: "update",
        directory: pathFiles.dest.js + "/libs"
      })
    });

    /**
     * Tarea para filtrar archivos de las librerías de bower
     * (gulp bower:filter)
     *
     * Se puede especificar que solo traiga los js de las librería a descargar
     * y estas se deben listar en el objeto {} "preen", dentro de archivo bower.json
     */
    gulp.task("bower:filter", function(cb) {
      return plugins.preen.preen({
        directory: pathFiles.dest.js + "/libs"
      }, cb);
    });

    /**
     * Tarea para comprimir librerias a gzip
     * (gulp bower:gzip)
     */
    gulp.task("bower:gzip", function(cb) {
      return gulp.src(pathFiles.dest.js + "/libs/**/*.*")
        .pipe(plugins.if(functions.isGzip, plugins.gzip({ append: false  })))
        .pipe(gulp.dest(pathFiles.dest.js + "/libs"))
    });

    /**
     * Tarea principal
     * (gulp bower)
     */
    gulp.task("bower", function(cb){
      plugins.runSequence("bower:install", "bower:filter", "bower:gzip", cb)
    });
  }

  return {
    run : runTasks
  }
}

module.exports = Task;
