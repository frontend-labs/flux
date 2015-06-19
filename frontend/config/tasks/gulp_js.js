/**
 * GULP JS: Tarea para compilar js de archivos .coffee
 * @author Victor Sandoval
 * @constructor
 */
function Task(gulp, path, config, plugins, functions){

	var pathCoffeeFiles = [
		path.frontend.coffee + '/libs/*.coffee',
		path.frontend.coffee + '/libs/**/*.coffee'
	]

	gulp.task('coffee', function() {
		return gulp.src(pathCoffeeFiles, { base : path.frontend.coffee })
		.pipe(plugins.coffee({bare: true}).on('error', functions.standardHandler))
		.pipe(gulp.dest(path.dest.js));
	});

	gulp.task('js:concat', function(){
		gulp.src(path.frontend.coffee + '/modules/**/*.coffee')
			.pipe(plugins.recursiveConcat({ extname: '.coffee' }))
			.pipe(plugins.coffee({ bare: true }))
			.pipe(plugins.if(config.prod, plugins.uglify({
				mangle 	: false, 
				compress: {
					drop_debugger: true
				}
			})))
			.pipe(gulp.dest(path.dest.js + '/modules'));
	});

	gulp.task('js:lint', function() {
		return gulp.src(path.dest.js + '/modules/**/*.js')
			.pipe(plugins.jshint(path.frontend.config + '/.jshintrc'))
			.pipe(plugins.jshint.reporter('jshint-stylish'))
			.pipe(plugins.jshint.reporter('fail'))
			.on('error', functions.standardHandler);
	});

	gulp.task('js:complexity', function(){
		gulp.src(path.frontend.coffee + '/modules/**/*.coffee')
			.pipe(plugins.coffee({ bare: true }))
			.pipe(plugins.complexity());
	});

	gulp.task('js:all', function(callback) {
		plugins.runSequence('clean:js', 'coffee', 'js:concat', 'js:lint', 'bower', callback);
	});

	gulp.task('js', function(callback) {
		plugins.runSequence('coffee', 'js:concat', 'js:lint', callback);
	});
}

module.exports = Task;