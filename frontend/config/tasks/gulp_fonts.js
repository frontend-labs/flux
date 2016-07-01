/**
 * Tarea Tarea para generar css de las fuentes
 *
 * @module Task (gulp fonts)
 * @extends Gulp
 * @extends Path
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, pathFiles, plugins, functions){
  var runTasks = function () {
    /**
     * Tarea para generar archivo .styl de las fuentes
     * (gulp fonts:compile)
     */
    gulp.task('fonts:compile', function(cb){
      var dirList = []
      plugins.fs.readdirSync(pathFiles.frontend.fonts + "/").forEach(function(file){
          if(/^[^_]*$/g.test(file)){
            dirList.push(file)
          }
      });
      return gulp.src(pathFiles.frontend.fonts + '/_template/fonts.styl')
        .pipe(plugins.consolidate('lodash', { dirList: dirList }))
        .pipe(gulp.dest(pathFiles.frontend.styles + '/layout'));
    });

    /**
     * Tarea principal
     * (gulp fonts)
     */
    gulp.task('fonts', function(cb) {
      plugins.runSequence('fonts:compile', 'css', 'copy:fonts', cb);
    });
  }

  return {
    run : runTasks
  }
}

module.exports = Task;