/**
 * GULP FONTS: Tarea para generar css (.styl) de las fuentes  
 * @author Victor Sandoval
 * @constructor
 */
var fs   = require('fs');

function Task(gulp, path, config, plugins, functions){

	gulp.task('fonts:compile', function(){
		fs.readdir(path.frontend.staticFiles_fonts + "/", function(err, files) {
			if (err) throw err;
			var dirList = files.filter(function(file) { return (/^[^_]*$/g).test(file); });
			gulp.src(path.frontend.staticFiles_fonts + '/_template/fonts.styl')
				.pipe(plugins.consolidate('lodash', { dirList: dirList }))
				.pipe(gulp.dest(path.frontend.stylus + '/layout'));
		})
	});

	gulp.task('fonts', function(callback) {
		plugins.runSequence('fonts:compile', 'styles', 'copy:fonts', callback);
	});

}

module.exports = Task;