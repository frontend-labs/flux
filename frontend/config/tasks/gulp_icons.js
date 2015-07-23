/**
 * Tarea para compilar iconos en .svg a fuente de iconos
 *
 * @module Task (gulp icons)
 * @extends Gulp
 * @extends Path
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, path, config, plugins, functions){

	/**
	 * Tarea para compilar iconos .svg
	 * (gulp icons:compile)
	 *
	 * Genera un archivo .styl y archivos de fuentes .eot .svg .ttf .woff
	 */
	gulp.task('icons:compile', function(){
		gulp.src(path.frontend.icons + '/*.svg')
			.pipe(plugins.iconfont({ 
				normalize: true, 
				fontName: 'iconFonts-webfont', 
				appendCodepoints: true
			}))
			.on('codepoints', function(codepoints, options) {
				gulp.src(path.frontend.icons + '/_template/icons.styl') //Template
					.pipe(plugins.consolidate('lodash', {
						glyphs: codepoints,
						fontName: 'iconFonts'
					}))
					.pipe(gulp.dest(path.frontend.pre_css + '/layout/_elements'));
			})
			.pipe(gulp.dest(path.frontend.fonts + '/iconFonts'));
	});

	/**
	 * Tarea principal
	 * (gulp icons)
	 */
	gulp.task('icons', function() {
		plugins.runSequence('icons:compile', 'fonts:compile', 'styles', 'copy:fonts');
	});

}

module.exports = Task;