/*!!
*
* Tarea para realizar pruebas unitarias
*
* tarea principal: gulp mocha
*/

function Task(gulp, path, config, plugins, functions) {

    gulp.task('mocha', function(all, module, controller) {
        //Defino que parametros han sido enviados
        var onlyModule = (module!==null && controller===null);
        var testAll =  all !== null ? all : false;
        controller = controller !== null ? controller : config.unit_tests.controller;
        module =  module !== null ? module : config.unit_tests.module;
        
        //Defino el envio de modulo y controlador
        var ubication = onlyModule ? [module]: [module, controller];

        //Filtro las pruebas a ejecutarse
        functions.tellMeWhatIamTesting(testAll, ubication);
        var path_js = functions.getPathJS(path, testAll, ubication)
        var path_test = functions.getPathTests(path, testAll, ubication);
        var files_js = functions.getFilesFrom(path_js);
        
        //Utilidades globales para las pruebas
        global.expect = require('chai').expect;
        global.jsdom = require("jsdom").jsdom;
        global.$ = require('jquery')(jsdom().parentWindow);
        global.yOSON = require(path.dest.js + '/libs/yosonjs/build/yoson-min.js');

        return gulp.src(path_test, {read: false})
        .pipe(plugins.mocha({
            reporter: 'nyan',
            require: files_js
        }));
    });
}

module.exports = Task;
