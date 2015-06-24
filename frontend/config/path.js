
//Routes
var path = {base : {}, frontend : {}, dest : {}};

//------------------------------------------------------
path.base                         = __dirname + '/../..';
//------------------------------------------------------
path.frontend.base                = path.base + '/frontend';
//------------------------------------------------------

path.frontend.config              = path.frontend.base + '/config';
path.frontend.coffee              = path.frontend.base + '/__coffee';
path.frontend.jade                = path.frontend.base + '/__jade';
path.frontend.stylus              = path.frontend.base + '/__stylus';
path.frontend.staticFiles         = path.frontend.base + '/static_files';
  path.frontend.staticFiles_fonts = path.frontend.staticFiles + '/fonts'
  path.frontend.staticFiles_icons = path.frontend.staticFiles + '/icons'
  path.frontend.staticFiles_img   = path.frontend.staticFiles + '/img'

//------------------------------------------------------
path.dest.serverFiles             = path.base + '/public';
//------------------------------------------------------
path.dest.static                  = '';
//------------------------------------------------------

path.dest.css                     = path.dest.serverFiles + path.dest.static + '/css';
path.dest.js                      = path.dest.serverFiles + path.dest.static + '/js';
path.dest.img                     = path.dest.serverFiles + path.dest.static + '/img';
path.dest.fonts                   = path.dest.serverFiles + path.dest.static + '/fonts';
path.dest.html                    = path.dest.serverFiles + path.dest.static + '/html';


module.exports = path;