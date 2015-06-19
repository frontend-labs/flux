/**
 * GULP SPRITE: Tarea para generar archivo sprite de imagenes
 * @author Victor Sandoval
 * @constructor
 */
function Task(gulp, path, config, plugins, functions){

	gulp.task('sprite:compile', function () {
		var spriteData = gulp.src(path.frontend.staticFiles_img + '/_sprite/main_sprite/*.png')
			.pipe(plugins.spritesmith({
				algorithm: 'binary-tree',
				imgPath: '/img/main_sprite.png',
				imgName: 'main_sprite.png',
				cssName: 'main_sprite.styl'
			}));

		// Pipe image stream through image optimizer and onto disk
		var imgStream = spriteData.img.pipe(gulp.dest(path.frontend.staticFiles_img + '/'));

		// Pipe CSS stream through CSS optimizer and onto disk
		var cssStream = spriteData.css.pipe(gulp.dest(path.frontend.stylus + '/_helpers/'));
	});

	gulp.task('sprite', function (callback) {
		plugins.runSequence('sprite:compile', 'copy:img:sprite', 'styles',  callback);
	});

}

module.exports = Task;