/**
 * Contiene todas las rutas del proyecto
 *
 * @module Path
 * @author Victor Sandoval
 */

var path = {base : {}, frontend : {}, dest : {}};

/**
 * Ruta base del proyecto
 * @property base
 * @type String
 */
path.base                         = __dirname + '/../..';

/**
 * Ruta base de la carpeta frontend
 * @property base
 * @type String
 */
path.frontend.base                = path.base + '/frontend';

//-----------------------------------------------------------------------
path.frontend.config              = path.frontend.base + '/config';
path.frontend.coffee              = path.frontend.base + '/__coffee';
path.frontend.jade                = path.frontend.base + '/__jade';
path.frontend.stylus              = path.frontend.base + '/__stylus';
path.frontend.staticFiles         = path.frontend.base + '/static_files';
  path.frontend.staticFiles_fonts = path.frontend.staticFiles + '/fonts';
  path.frontend.staticFiles_icons = path.frontend.staticFiles + '/icons';
  path.frontend.staticFiles_img   = path.frontend.staticFiles + '/img';
//-----------------------------------------------------------------------

/**
 * Ruta base donde se cargará el servidor express
 * @property serverFiles
 * @type String
 */
path.dest.serverFiles             = path.base + '/public';

/**
 * Ruta de los archivos estáticos (js, css, imagenes y fuentes)
 * @property serverFiles
 * @type String
 */
path.dest.static                  = '';

//-----------------------------------------------------------------------
path.dest.css                     = path.dest.serverFiles + path.dest.static + '/css';
path.dest.js                      = path.dest.serverFiles + path.dest.static + '/js';
path.dest.img                     = path.dest.serverFiles + path.dest.static + '/img';
path.dest.fonts                   = path.dest.serverFiles + path.dest.static + '/fonts';
path.dest.html                    = path.dest.serverFiles + path.dest.static + '/html';
//-----------------------------------------------------------------------

module.exports = path;