/**
 * Tarea Tarea para generar css de las fuentes
 *
 * @module Task (gulp fonts)
 * @extends Gulp
 * @extends Path
 * @extends Plugins
 * @extends Fs
 * @author Victor Sandoval
 */

var fs   = require('fs');

function Task(gulp, path, config, plugins, functions){

	/**
	 * Tarea para generar archivo .styl de las fuentes
	 * (gulp fonts:compile)
	 */
	gulp.task('fonts:compile', function(){
		fs.readdir(path.frontend.staticFiles_fonts + "/", function(err, files) {
			if (err) throw err;
			var dirList = files.filter(function(file) { return (/^[^_]*$/g).test(file); });
			gulp.src(path.frontend.staticFiles_fonts + '/_template/fonts.styl')
				.pipe(plugins.consolidate('lodash', { dirList: dirList }))
				.pipe(gulp.dest(path.frontend.stylus + '/layout'));
		})
	});

	/**
	 * Tarea principal
	 * (gulp fonts)
	 */
	gulp.task('fonts', function() {
		plugins.runSequence('fonts:compile', 'styles', 'copy:fonts');
	});

}

module.exports = Task;