/**
 * Contiene las viariables globales de configuracion
 *
 * @module Config
 * @author Victor Sandoval
 */

var CONFIG = {
	prod : true,
	port : 4000,
	tests : {
		unit: {module: 'postulante', controller: 'buscar'}
	}
};

module.exports = CONFIG;
