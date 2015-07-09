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
module.exports.unit_tests = {module: 'postulante', controller: 'buscar'};
