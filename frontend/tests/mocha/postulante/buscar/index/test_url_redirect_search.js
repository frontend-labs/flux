describe('test_url_redirect_search', function(){
	before(function () {
		var modulo;
	})
	describe("eSearch", function () {
		before(function () {
			modulo = yOSON.AppCore.getModuleFunctions('url_redirect_search');
			$('body').append('<ul data-key="areas" class="filters"> <li> <form id="fFilterAC" data-type="areas"> <ul> <li class="filter_options"> <input data-value="legal" class="checkN" type="checkbox" checked="checked"> </li><li class="filter_options"> <input data-value="operaciones" class="checkN" type="checkbox" checked="checked"> </li><li class="filter_options"> <input data-value="mantenimiento" class="checkN" type="checkbox"> </li></ul> </form> </li></ul> <ul data-key="nivel" class="filters"> <li> <form id="fFilterSNiv" data-type="nivel"> <ul> <li class="filter_options"> <input data-value="gerencia" class="checkN" type="checkbox"> </li><li class="filter_options"> <input data-value="jefe-supervisor" class="checkN" type="checkbox" checked="checked"> </li></ul> </form> </li></ul> <ul data-key="ubicacion" class="filters"> <li> <form id="fFilterSNiv" data-type="ubicacion"> <ul> <li class="filter_options"> <input data-value="arequipa" class="checkN" type="checkbox"> </li></ul> </form> </li></ul>');
		})

		it('testCreateSqueleton', function () {
			var output = {areas: [], nivel: [], ubicacion: []};
			var input = $('.filters');
			expect(modulo.createSqueleton(input)).eql(output);
		})

		it('testBuildStructure', function () {
			var skeleton = {areas: [], nivel: [], ubicacion: []};
			var input = [skeleton, $('.checkN:checked')];
			var output = {areas: ['legal', 'operaciones'], nivel: ['jefe-supervisor'], ubicacion: []};
			expect(modulo.buildStructure(input[0], input[1])).eql(output);
		})

		it('testCleanText', function () {
			var input = 'programador python';
			var output = 'programador+python';
			expect(modulo.cleanText(input)).eql(output);
		})

		it('testCreateBaseURL', function () {
			var input = ['http://local.aptitus.pe', 'programador+python'];
			var output = 'http://local.aptitus.pe/buscar/q/programador+python/';
			expect(modulo.createBaseURL(input[0], input[1])).eql(output);
		})

		it('testCreateFinalUrl', function () {
			var input = [{areas: ['legal', 'operaciones'], nivel:['jefe-supervisor']}, 'http://local.aptitus.pe/buscar/q/programador+python/'];
			var output = 'http://local.aptitus.pe/buscar/q/programador+python/areas/legal--operaciones/nivel/jefe-supervisor/';
			expect(modulo.createFinalUrl(input[0], input[1])).eql(output);
		})
	})

});
