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
  getFilesFrom : function(directory){
    var fs = require('fs');
    var path = require('path');
    var files = [];
    var getFiles = function(obj, dir){
      fs.readdirSync(dir).forEach(function(file){
        if (fs.statSync(path.join(dir, file)).isDirectory()){
          obj[file] = {};
          getFiles(obj[file], path.join(dir, file));               
        } else if (/\.js$/.test(file)) {
          file = path.basename(file, '.js');
          files.push(path.join(dir, file)+'.js');
        }
      });
      return files;
    };
    return getFiles({}, directory)
  },
  getPathJS: function(path, all, ubication){
      var finalPath = path.dest.js + '/modules/';
      if(!all){
          finalPath = finalPath + ubication.join('/') + '/' ;
      }
      return finalPath;
  },
  getPathTests: function(path, all, ubication){
      var basePath = path.frontend.tests + '/mocha/';
      if(!all){
          basePath = basePath + ubication.join('/') + '/' ;
      }
      finalPath = [basePath + '*.js', basePath + '**/*.js'];
      return finalPath;
  },
  tellMeWhatIamTesting:  function(all, ubication){
      if(!all){
          console.log('=> Se ejecutan las pruebas de ' + ubication.join('/'));
      }else{
          console.log('=> Se ejecutan todas las pruebas');
      }
  }
}

module.exports = Functions;