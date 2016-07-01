/**
 * Tarea para ejecutar el servidor express
 *
 * @module Task (gulp server)
 * @extends Gulp
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, pathFiles, plugins, functions, local){

  var setGlobalVariables = function (req){
    var oP = {};
    oP.version    = new Date().getTime();
    oP.section    = req.params.section;
    oP.baseUrl    = "http://" + req.headers.host;
    oP.staticUrl  = oP.baseUrl + pathFiles.dest.static + "/";
    oP.elementUrl = oP.baseUrl;
    return oP;
  };

  var runTasks = function () {
    /**
     * Tarea principal
     * (gulp server)
     */
    gulp.task('server', function () {
      var app = plugins.express();

      app.set('view engine', 'jade');
      app.set('views', pathFiles.dest.serverFiles);
      app.use(plugins.express.static(pathFiles.dest.serverFiles));

      app.get("/:section", function(req, res) {
        var jadeGlobals = setGlobalVariables(req);
        res.render(pathFiles.frontend.views + "/" + jadeGlobals.section, jadeGlobals);
      });

      app.get("/", function(req, res) {
        var jadeGlobals = setGlobalVariables(req);
        jadeGlobals.section = "index";
        res.render(pathFiles.frontend.views + "/" + jadeGlobals.section, jadeGlobals);
      });

      app.listen(local.PORT);

      //ps -ax | grep node
      //60778 ??         0:00.62 /usr/local/bin/node abc.js
      //kill -9 60778
    });
  }
  
  return {
    run : runTasks
  }
}

module.exports = Task;