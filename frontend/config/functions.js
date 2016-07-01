/**
 * Contiene todos las funciones globales de las tareas gulp
 *
 * @module Functions
 * @extends Plugins
 * @author Victor Sandoval
 */

var Plugins   = require('./plugins');
var Functions = {
  errorHandler : function(error){
    var colorRed = Plugins.util.colors.red;
    Plugins.notifier.notify({
      title   : 'Error en la tarea: ' + error.plugin,
      message : error.message
    });
    Plugins.util.log(
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
    Plugins.notifier.notify({
      title   : 'Compilación completa',
      message : 'Tarea terminada'
    });
  },
  isProduction : function (){
    flag = true;
    if(Plugins.util.env.dev){
      flag = false;
    }
    return flag;
  },
  isGzip : function (){
    flag = false;
    if(Plugins.util.env.gzip){
      flag = true;
    }
    return flag;
  }
}

module.exports = Functions;