var express = require("express"),
    path    = require('./path'),
    config  = require('./config.local');

var app = express();
app.set('view engine', 'jade');

/*
//Styles
app.use('/css', stylus.middleware({
  force : true,
  src : path.frontend.stylus,
  dest : path.dest.css,
  compile: function (str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true);
  }
}));
*/
app.use(express.static(path.dest.publicFiles));

app.get("/:module/:controller/:action", function(req, res) {
  var objRoute = {
    module      : req.params.module,
    controller  : req.params.controller,
    action      : req.params.action,

    version     : new Date().getTime(),
    baseUrl     : "http://" + req.headers.host + "/",
    staticUrl   : "http://" + req.headers.host + "/",
    elementUrl  : "http://" + req.headers.host + "/"
  }
  res.render(path.frontend.jade + "/modules/" + objRoute.module + "/" + objRoute.controller + "/" + objRoute.action, objRoute)
});

app.listen(config.port);
