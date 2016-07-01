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
Path.base               = __dirname + '/../..';

/**
 * Ruta base de la carpeta frontend
 * @property base
 * @type String
 */
Path.frontend.base      = Path.base + '/frontend';

Path.frontend.config    = Path.frontend.base + '/config';
Path.frontend.source    = Path.frontend.base + '/source';
Path.frontend.tests     = Path.frontend.base + '/tests';

Path.frontend.scripts   = Path.frontend.source + '/scripts';
Path.frontend.views  		= Path.frontend.source + '/views';
Path.frontend.styles    = Path.frontend.source + '/styles';
Path.frontend.temporals = Path.frontend.source + '/tmp';
Path.frontend.fonts     = Path.frontend.source + '/fonts';
Path.frontend.icons     = Path.frontend.source + '/icons';
Path.frontend.images    = Path.frontend.source + '/images';

/**
 * Ruta base donde se cargará el servidor express
 * @property serverFiles
 * @type String
 */
Path.dest.serverFiles   = Path.base + '/public';

/**
 * Ruta de los archivos estáticos (js, css, imagenes y fuentes)
 * @property serverFiles
 * @type String
 */
Path.dest.static         = '';

//-----------------------------------------------------------------------
Path.dest.css            = Path.dest.serverFiles + Path.dest.static + '/css';
Path.dest.js             = Path.dest.serverFiles + Path.dest.static + '/js';
Path.dest.img            = Path.dest.serverFiles + Path.dest.static + '/images';
Path.dest.fonts          = Path.dest.serverFiles + Path.dest.static + '/fonts';
Path.dest.html           = Path.dest.serverFiles + Path.dest.static + '/views';
//-----------------------------------------------------------------------

module.exports = Path;