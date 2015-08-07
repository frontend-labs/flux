/**
 * Tarea para manejar librerias de bower
 *
 * @module Task (gulp bower)
 * @extends Gulp
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(Gulp, Path, Config, Plugins, Functions){

  /**
   * Tarea para filtrar archivos de las librerías de bower
   * (gulp bower:filter)
   * 
   * Se puede especificar que solo traiga los js de las librería a descargar
   * y estas se deben listar en el objeto {} "preen", dentro de archivo bower.json
   */
  Gulp.task('bower:filter', function(cb) {
    Plugins.preen.preen({}, cb);
  });

  /**
   * Tarea principal
   * (gulp bower)
   */
  Gulp.task('bower', ['bower:filter']);
}

module.exports = Task;