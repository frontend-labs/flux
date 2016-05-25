/*!!
*
* Tarea para realizar pruebas unitarias
*
* tarea principal: gulp mocha
*/

function Task(gulp, path, config, plugins, functions) {
  var onlyModule, testAll, onlyModule, _sections, _module, ubication = '';
  var coffee_files_replaced = [];
  var coffee_path_files = [];

  gulp.task('mocha:params', function(all, module, sections){
    //Defino que parametros han sido enviados
    onlyModule = (module!==null && sections===null);
    testAll =  all !== null ? all : false;

    //Actualizo los valores de las variables acorde a lo solicitado
    _sections = sections !== null ? sections : config.tests.unit.sections;
    _module =  module !== null ? module : config.tests.unit.module;
    
    //Defino la ubicacion con ayuda de las variables
    ubication = onlyModule ? [_module]: [_module, _sections];

    //Busco la ubicación de los coffeescripts a ser testeados
    var path_coffee = getPaths(path.frontend.pre_js, testAll, ubication);
    coffee_path_files = getCoffeeFilesFrom(path_coffee);

    //Indico que pruebas seran ejecutadas
    tellMeWhatIamTesting(testAll, ubication);    
    return 
  });

  gulp.task('mocha:replace', function(){
    //Reemplaza cada archivo
    var streams = coffee_path_files['array'].map(function(file) {
      tmpFile = path.frontend.temporals;
      coffee_files_replaced.push(tmpFile + '/' + coffee_path_files['key'][file] + '.coffee')

      return gulp.src(file)
        .pipe(plugins.insert.prepend('functions.'))
        .pipe(gulp.dest(tmpFile));
    });
    return plugins.es.merge.apply(plugins.es, streams);
  });

  gulp.task('mocha:unit', function() {
    require('coffee-script/register')
    
    //Busco la ubicacion de las pruebas
    var path_test = getPathTests(path, testAll, ubication);

    //Utilidades globales para las pruebas
    global.expect = require('chai').expect;
    global.jsdom = require("jsdom").jsdom;
    global.$ = require('jquery')(jsdom().parentWindow);
    global.functions = {}
    
    //Se testean los archivos
    return gulp.src(path_test, {read: false})
      .pipe(plugins.mocha({
          reporter: 'nyan',
          require: coffee_files_replaced
        }));
  });

  gulp.task('mocha:clean', function () {
    return plugins.del(path.frontend.temporals);
  });

  gulp.task('mocha', function(cb){
    plugins.runSequence('mocha:params', 'mocha:replace', 'mocha:unit', 'mocha:clean', cb)
  });

  // ================ FUNCTIONS ================

  var getCoffeeFilesFrom = function(directory){
    var files = [];
    var objFiles = {}
    var getFiles = function(obj, dir){
      plugins.fs.readdirSync(dir).forEach(function(file){
        if (plugins.fs.statSync(plugins.path.join(dir, file)).isDirectory()){
          obj[file] = {};
          getFiles(obj[file], plugins.path.join(dir, file));               
        } else if (/\.coffee$/.test(file)) {
          file = plugins.path.basename(file, '.coffee');
          currentPath = plugins.path.join(dir, file)+'.coffee';
          files.push(currentPath);
          objFiles[currentPath] = file ;
        }
      });
      return {'array': files, 'key': objFiles};
    };
    return getFiles({}, directory)
  }
  var getPaths = function(path, all, ubication){
    var finalPath = path + '/';
    if(!all){
      finalPath = finalPath + ubication.join('/') + '/' ;
    }
    return finalPath;
  }
  var getPathTests = function(path, all, ubication){
    var basePath = path.frontend.tests + '/mocha/';
    if(!all){
      basePath = basePath + ubication.join('/') + '/' ;
    }
    finalPath = [basePath + '*.js', basePath + '**/*.js'];
    return finalPath;
  }
  var tellMeWhatIamTesting = function(all, ubication){
    if(!all){
      console.log('=> Se ejecutan las pruebas de ' + ubication.join('/'));
    }else{
      console.log('=> Se ejecutan todas las pruebas');
    }
  }
}



module.exports = Task;
