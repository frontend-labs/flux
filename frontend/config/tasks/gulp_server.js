/**
 * Tarea para ejecutar el servidor express
 *
 * @module Task (gulp server)
 * @extends Gulp
 * @extends Path
 * @extends Config
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, path, config, plugins, functions){

  /**
   * Tarea principal
   * (gulp server)
   */
  gulp.task('server', function () {
    var setGlobalVariables = function (req){
      var oP = {};
      oP.version    = new Date().getTime();
      oP.section    = req.params.section;
      oP.baseUrl    = "http://" + req.headers.host;
      oP.staticUrl  = oP.baseUrl + path.dest.static + "/";
      oP.elementUrl = oP.baseUrl;
      return oP;
    };

    var app = plugins.express();
    app.set('view engine', 'jade');
    app.set('views', path.dest.serverFiles);

    app.use(plugins.express.static(path.dest.serverFiles));

    app.get("/:section", function(req, res) {
      var jadeGlobals = setGlobalVariables(req);
      res.render(path.frontend.pre_html + "/views/" + jadeGlobals.section, jadeGlobals);
    });

    app.get("/", function(req, res) {
      var jadeGlobals = setGlobalVariables(req);
      jadeGlobals.section = "index";
      res.render(path.frontend.pre_html + "/views/" + jadeGlobals.section, jadeGlobals);
    });

    app.listen(config.port);

    //ps -ax | grep node
    //60778 ??         0:00.62 /usr/local/bin/node abc.js
    //kill -9 60778
  });

}

module.exports = Task;