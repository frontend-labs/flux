var webdriverio = require('webdriverio');

client = {};
client = webdriverio.remote({ desiredCapabilities: {browserName: 'firefox'} });
data        = require('./dictionary'),
chai        = require('chai'),
assert      = chai.assert,
expect      = chai.expect;

function fnImportTest(name, path) {
    describe(name, function () {
        require(path);
    });
};

describe('Pruebas Funcionales', function(){

    this.timeout(99999999);

    before(function(done){
        client.init(done);
    });

    fnImportTest("Postulante - Sin sesion", './postulante/sin_sesion/login');
    fnImportTest("Postulante - Con sesion", './postulante/con_sesion/mi_cuenta');

    after(function(done) {
        client.end(done);
    });
});