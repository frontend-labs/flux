/**
 * Tarea Tarea para generar css de las fuentes
 *
 * @module Task (gulp fonts)
 * @extends Gulp
 * @extends Path
 * @extends Plugins
 * @extends Fs
 * @author Victor Sandoval
 */

var fs   = require('fs');

function Task(gulp, path, config, plugins, functions){

  /**
   * Tarea para generar archivo .styl de las fuentes
   * (gulp fonts:compile)
   */
  gulp.task('fonts:compile', function(cb){
    var dirList = []
    plugins.fs.readdirSync(path.frontend.fonts + "/").forEach(function(file){
        if(/^[^_]*$/g.test(file)){
          dirList.push(file)
        }
    });
    return gulp.src(path.frontend.fonts + '/_template/fonts.styl')
      .pipe(plugins.consolidate('lodash', { dirList: dirList }))
      .pipe(gulp.dest(path.frontend.pre_css + '/layout'));
  });

  /**
   * Tarea principal
   * (gulp fonts)
   */
  gulp.task('fonts', function(cb){
    plugins.runSequence('fonts:compile', 'css', 'copy:fonts', cb)
  });

}

module.exports = Task;