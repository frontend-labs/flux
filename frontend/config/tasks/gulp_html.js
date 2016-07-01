/**
 * Tarea para compilar archivos .jade
 *
 * @module Task (gulp html)
 * @extends Gulp
 * @extends Path
 * @extends Plugins
 * @extends Functions
 * @author Victor Sandoval
 */
function Task(gulp, pathFiles, plugins, functions){

  var pathJadeFiles = [
    pathFiles.frontend.views + '/*.jade',
    '!' + pathFiles.frontend.views + '/_**/**/*.jade'
  ]

  var fn = {
    compiler: function (pathSrc){
      return gulp.src(pathSrc, { base : pathFiles.frontend.views })
        .pipe(plugins.jade({
          pretty: !functions.isProduction(),
          locals: {
            baseUrl   : "/",
            staticUrl : "/",
            elementUrl: "/",
            version   : new Date().getTime()
          }
        }))
        .on('error', functions.errorHandler)
        .pipe(plugins.rename({ extname: ".phtml" }))
        .pipe(gulp.dest(pathFiles.dest.html))
        .on('end', functions.successHandler);
    },
    filter: function (inheritanceFiles){
      var path = [];
      inheritanceFiles.forEach(function(file) {
        // Filtro los archivos _*.jade para no ser compilados
        if (!/^_.+$/g.test(file)) {
          path.push(pathFiles.frontend.views + '/' + file);
        }
      });
      return path;
    }
  }

  /**
   * Tarea principal
   * (gulp html)
   */
  var runTasks = function(){
    gulp.task('html', function() {
      return fn.compiler(pathJadeFiles);
    });
  }

  var watcher = function(chunk){
    var options = { basedir: pathFiles.frontend.views };
    var inheritance = new plugins.jadeInheritance(chunk.path, options.basedir, options);

    fn.compiler(fn.filter(inheritance.files));
    plugins.browserSync.reload;
  }

  return {
    run : runTasks,
    watcher: watcher
  }
}

module.exports = Task;