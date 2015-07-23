/**
 * Contiene las viariables globales de configuracion
 *
 * @module Config
 * @author Victor Sandoval
 */

var Config = {
	prod : true,
	port : 4000
};

module.exports = Config;
module.exports.UNIT_TESTS = {module: 'postulante', controller: 'buscar'};
