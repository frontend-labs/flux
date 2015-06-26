/**
 * Contiene todas las rutas del proyecto
 *
 * @module Path
 * @author Victor Sandoval
 */

var Path = {base : {}, frontend : {}, dest : {}};

/**
 * Ruta base del proyecto
 * @property base
 * @type String
 */
Path.base                         = __dirname + '/../..';

/**
 * Ruta base de la carpeta frontend
 * @property base
 * @type String
 */
Path.frontend.base                = Path.base + '/frontend';

//-----------------------------------------------------------------------
Path.frontend.config              = Path.frontend.base + '/config';
Path.frontend.coffee              = Path.frontend.base + '/__coffee';
Path.frontend.jade                = Path.frontend.base + '/__jade';
Path.frontend.stylus              = Path.frontend.base + '/__stylus';
Path.frontend.staticFiles         = Path.frontend.base + '/static_files';
  Path.frontend.staticFiles_fonts = Path.frontend.staticFiles + '/fonts';
  Path.frontend.staticFiles_icons = Path.frontend.staticFiles + '/icons';
  Path.frontend.staticFiles_img   = Path.frontend.staticFiles + '/img';
//-----------------------------------------------------------------------

/**
 * Ruta base donde se cargará el servidor express
 * @property serverFiles
 * @type String
 */
Path.dest.serverFiles             = Path.base + '/public';

/**
 * Ruta de los archivos estáticos (js, css, imagenes y fuentes)
 * @property serverFiles
 * @type String
 */
Path.dest.static                  = '';

//-----------------------------------------------------------------------
Path.dest.css                     = Path.dest.serverFiles + Path.dest.static + '/css';
Path.dest.js                      = Path.dest.serverFiles + Path.dest.static + '/js';
Path.dest.img                     = Path.dest.serverFiles + Path.dest.static + '/img';
Path.dest.fonts                   = Path.dest.serverFiles + Path.dest.static + '/fonts';
Path.dest.html                    = Path.dest.serverFiles + Path.dest.static + '/html';
//-----------------------------------------------------------------------

module.exports = Path;