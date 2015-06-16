/**
 * GULP JS: Tarea para compilar js de archivos .coffee
 * @author Victor Sandoval
 * @constructor
 */
function Task(gulp, path, config, plugins, fs){

	var pathCoffeeFiles = [
		path.frontend.coffee + '/**/*.coffee',
		path.frontend.coffee + '/**/**/*.coffee',
		'!' + path.frontend.coffee + '/_**/*.coffee',
		'!' + path.frontend.coffee + '/**/_*.coffee'
	]

	gulp.task('coffee', function() {
		return gulp.src(pathCoffeeFiles, { base : path.frontend.coffee })
		.pipe(plugins.coffee({bare: true}).on('error', function(cb){ }))
		.pipe(gulp.dest(path.dest.js_source));
	});

	gulp.task('concat:js', function(){
		gulp.src(path.dest.js_source + '/modules/**/*.js')
			.pipe(plugins.jsConcat({
				extname: '.js'
			}))
			.pipe(plugins.if(config.prod, plugins.uglify({
				mangle 	: false, 
				compress: {
					drop_debugger: true
				}
			})))
			.pipe(gulp.dest(path.dest.js_dist + '/modules/'));
	});

	gulp.task('lint', function() {
		return gulp.src([
			path.dest.js_source + '/**/*.js',
			'!'+ path.dest.js_source + '/libs/**/*.js'
			])
			.pipe(plugins.jshint(path.frontend.config + '/.jshintrc'))
			.pipe(plugins.jshint.reporter('jshint-stylish'))
			.pipe(plugins.jshint.reporter('fail'));
	});

	gulp.task('js', function(callback) {
		plugins.runSequence('clean:js', 'coffee', 'concat:js', 'lint', 'copy:js:libs', 'bower', callback);
	});
}

module.exports = Task;