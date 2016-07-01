/**
 * Tarea para compilar iconos en .svg a fuente de iconos
 *
 * @module Task (gulp icons)
 * @extends Gulp
 * @extends Path
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, pathFiles, plugins, functions){
  var runTasks = function () {
    var runTimestamp = Math.round(Date.now()/1000);
    /**
     * Tarea para compilar iconos .svg
     * (gulp icons:compile)
     *
     * Genera un archivo .styl y archivos de fuentes .eot .svg .ttf .woff
     */
    gulp.task('icons:compile', function(){
      return gulp.src(pathFiles.frontend.icons + '/*.svg')
        .pipe(plugins.iconfont({
          normalize: true,
          prependUnicode: true,
          fontName: 'Icons-webfont',
          formats: ['ttf', 'eot', 'woff', 'svg'],
          timestamp: runTimestamp
        }))
        .on('glyphs', function(codepoints, options) {
          gulp.src(pathFiles.frontend.icons + '/_template/icons.styl') //Template
            .pipe(plugins.consolidate('lodash', {
              glyphs: codepoints,
              fontName: options.fontName
            }))
            .pipe(gulp.dest(pathFiles.frontend.styles + '/_partials/includes'));
        })
        .pipe(gulp.dest(pathFiles.frontend.fonts + '/Icons'));
    });

    /**
     * Tarea principal
     * (gulp icons)
     */
    gulp.task('icons', function(cb) {
      plugins.runSequence('icons:compile', 'fonts:compile', 'css', 'copy:fonts', cb);
    });
  }

  return {
    run : runTasks
  }
}

module.exports = Task;
