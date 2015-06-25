/**
 * GULP COPY: Tarea para copiar archivos de la carpeta frontend a la pública
 * @author Victor Sandoval
 * @constructor
 */
function Task(gulp, path, config, plugins, functions){

	//----------------------------------------------------
	var pathCopyImgFiles = [
		path.frontend.staticFiles_img + '/**/**/*.*',
		'!' + path.frontend.staticFiles_img + '/_**/**/*.*',
		'!' + path.frontend.staticFiles_img + '/**/_**/*.*',
		'!' + path.frontend.staticFiles_img + '/**/**/_*.*'
	]
	//----------------------------------------------------
	gulp.task('copy:img', function() {
		gulp.src(pathCopyImgFiles, { base : path.frontend.staticFiles })
			.pipe(plugins.if(config.prod, plugins.imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [
					plugins.imageminPNG({optimizationLevel: 3}),
					plugins.imageminJPG({progressive: true}),
					plugins.imageminGIF({interlaced: true}),
					plugins.imageminSVG()
				]
			})))
			.pipe(gulp.dest(path.dest.serverFiles + path.dest.static));
	});

	gulp.task('copy:img:sprite', function() {
		gulp.src(path.frontend.staticFiles_img + '/*_sprite.png', { base : path.frontend.staticFiles })
			.pipe(plugins.if(config.prod, plugins.imagemin({
				progressive: true,
				use: [ plugins.imageminPNG({optimizationLevel: 3}) ]
			})))
			.pipe(gulp.dest(path.dest.serverFiles + path.dest.static));
	});

	//----------------------------------------------------
	var pathCopyFontsFiles = [
		path.frontend.staticFiles_fonts + '/**/*.*',
		'!' + path.frontend.staticFiles_fonts + '/_**/*.*'
	]
	//----------------------------------------------------
	gulp.task('copy:fonts', function() {
		gulp.src(pathCopyFontsFiles, { base : path.frontend.staticFiles })
			.pipe(gulp.dest(path.dest.serverFiles + path.dest.static));
	});

	gulp.task('copy:js:libs', function () {
    gulp.src(path.frontend.coffee + '/libs/*.js')
      .pipe(gulp.dest(path.dest.js + '/libs'));
  });
	
	gulp.task('copy', function (callback) {
		plugins.runSequence('copy:img', 'copy:fonts',  callback);
	});

}


module.exports = Task;