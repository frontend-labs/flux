/**
 * Tarea para generar archivo sprite de imagenes png
 *
 * @module Task (gulp sprites)
 * @extends Gulp
 * @extends Path
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, path, config, plugins, functions){

	/**
	 * Tarea para compilar archivos png y tranformarlos a un sprite
	 * (gulp sprites:compile)
	 *
	 * Genera un archivo img y un .styl
	 */
	gulp.task('sprites:compile', function () {
		var spriteData = gulp.src(path.frontend.staticFiles_img + '/_sprite/main_sprite/*.png')
			.pipe(plugins.spritesmith({
				algorithm: 'binary-tree',
				imgPath: '/img/main_sprite.png',
				imgName: 'main_sprite.png',
				cssName: 'main_sprite.styl'
			}));

		// Genera archivo sprite
		var imgStream = spriteData.img.pipe(gulp.dest(path.frontend.staticFiles_img + '/'));

		// Genera archivo .styl
		var cssStream = spriteData.css.pipe(gulp.dest(path.frontend.stylus + '/_helpers/'));
	});

	/**
	 * Tarea principal
	 * (gulp sprites)
	 */
	gulp.task('sprites', function () {
		plugins.runSequence('sprites:compile', 'copy:img:sprites', 'styles');
	});

}

module.exports = Task;