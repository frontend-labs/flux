var gulp    = require('gulp'),
    path    = require('./config/path'),
    config  = require('./config/config.local')
    plugins = require('./config/plugins');


var functions = {
  errorHandler : function(error){
    var colorRed = plugins.util.colors.red;
    plugins.notifier.notify({
      title   : 'Error en la tarea: ' + error.plugin,
      message : error.message
    });
    plugins.util.log(
      '\n',
      colorRed('----------------------------'),'\n',
      colorRed(' Error en la tarea: ' + error.plugin), '\n',
      colorRed('----------------------------'), '\n',
      error.message, '\n',
      colorRed('----------------------------')
    );
    this.emit('end');
  },
  successHandler : function(){
    plugins.notifier.notify({
      title   : 'Compilación completa',
      message : 'Tarea terminada'
    });
  }
}

var runTask = function (nameTask){
  var Task = require("./config/tasks/" + nameTask);
  new Task(gulp, path, config, plugins, functions);
};

runTask("gulp_clean");
runTask("gulp_copy");
runTask("gulp_styles");
runTask("gulp_sprite");
runTask("gulp_fonts");
runTask("gulp_html");
runTask("gulp_icons");
runTask("gulp_js");
runTask("gulp_watch");
runTask("gulp_bower");

gulp.task('default', ['clean'], function (cb) {
  plugins.runSequence('copy', 'fonts', 'icons', 'sprite', 'styles:all', 'js:all', cb);
});
