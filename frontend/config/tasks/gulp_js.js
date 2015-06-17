/**
 * GULP JS: Tarea para compilar js de archivos .coffee
 * @author Victor Sandoval
 * @constructor
 */
function Task(gulp, path, config, plugins, fs){

	var pathCoffeeFiles = [
		path.frontend.coffee + '/libs/*.coffee',
		path.frontend.coffee + '/libs/**/*.coffee'
	]

	gulp.task('coffee', function() {
		return gulp.src(pathCoffeeFiles, { base : path.frontend.coffee })
		.pipe(plugins.coffee({bare: true}).on('error', function(cb){ }))
		.pipe(gulp.dest(path.dest.js));
	});

	gulp.task('concat:js', function(){
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

	gulp.task('lint', function() {
		return gulp.src([
			path.dest.js + '/**/*.js',
			'!'+ path.dest.js + '/libs/**/*.js'
			])
			.pipe(plugins.jshint(path.frontend.config + '/.jshintrc'))
			.pipe(plugins.jshint.reporter('jshint-stylish'))
			.pipe(plugins.jshint.reporter('fail'));
	});

	gulp.task('js:watch', function(callback) {
		plugins.runSequence('coffee', 'concat:js', 'lint', callback);
	});
	
	gulp.task('js', function(callback) {
		plugins.runSequence('clean:js', 'coffee', 'concat:js', 'lint', 'bower', callback);
	});
}

module.exports = Task;