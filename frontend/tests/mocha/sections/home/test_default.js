describe('test_default', function(){

	describe("#greeting()", function () {
		it('should say hello when I speak in english', function () {
			expect(functions.fn.greeting("en")).eql("Hello");
		})
		it('should say hola when I speak in spanish', function () {
			expect(functions.fn.greeting("es")).eql("Hola");
		})
		it('should say bonjour when I speak in french', function () {
			expect(functions.fn.greeting("fr")).eql("Bonjour");
		})
	})

});
