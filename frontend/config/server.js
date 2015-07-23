/**
 * Contiene la configuración principal del servidor express, como:
 * Configuración de las rutas de los estáticos y lógica de urls del servidor.
 *
 * @author Victor Sandoval
 */

var express = require("express"),
    path    = require('./path'),
    config  = require('./config.local');

var app = express();
app.set('view engine', 'jade');
app.set('views', path.dest.serverFiles);

app.use(express.static(path.dest.serverFiles));

app.get("/:module/:controller/:action", function(req, res) {
  var objRoute = {};
  //------------------------------------------------------------
  objRoute.module     = req.params.module;
  objRoute.controller = req.params.controller;
  objRoute.action     = req.params.action;
  objRoute.version    = new Date().getTime();
  objRoute.baseUrl    = "http://" + req.headers.host + "/";
  objRoute.staticUrl  = objRoute.baseUrl + path.dest.static + "/";
  objRoute.elementUrl = objRoute.baseUrl;
  //------------------------------------------------------------
  
  if (objRoute.module != "undefined" && objRoute.controller != "undefined" && objRoute.action != "undefined"){
    res.render(path.frontend.pre_html + "/modules/" + objRoute.module + "/" + objRoute.controller + "/" + objRoute.action, objRoute);
  }else{
    res.end();
  }
});

app.get("/", function(req, res) {
  res.render(path.frontend.pre_html + "/_welcome");
});

app.listen(config.port);

//ps -ax | grep node
//60778 ??         0:00.62 /usr/local/bin/node abc.js
//kill -9 60778
