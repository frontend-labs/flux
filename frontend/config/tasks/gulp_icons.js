/**
 * GULP ICONS: Tarea para compilar iconos en .svg a fuente de iconos
 * @author Victor Sandoval
 * @constructor
 */
function Task(gulp, path, config, plugins){

	gulp.task('compileIcons', function(){
		gulp.src(path.frontend.staticFiles_icons + '/*.svg')
			.pipe(plugins.iconfont({ 
				normalize: true, 
				fontName: 'iconFonts-webfont', 
				appendCodepoints: true 
			})).on('codepoints', function(codepoints, options) {
				gulp.src(path.frontend.staticFiles_icons + '/_template/icons.styl') //Template
					.pipe(plugins.consolidate('lodash', {
						glyphs: codepoints,
						fontName: 'iconFonts'
					}))
					.pipe(gulp.dest(path.frontend.stylus + '/layout/_elements'));
			})
			.pipe(gulp.dest(path.frontend.staticFiles_fonts + '/iconFonts'));
	});

	gulp.task('icons', function(callback) {
		plugins.runSequence('compileIcons', 'compileFonts', 'styles', 'copy:fonts', callback);
	});

}

module.exports = Task;