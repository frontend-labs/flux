/**
 * Tarea para copiar archivos de la carpeta frontend a la carpeta pública
 *
 * @module Task (gulp copy)
 * @extends Gulp
 * @extends Path
 * @extends Config
 * @extends Plugins
 * @author Victor Sandoval
 */

function Task(gulp, path, config, plugins, functions){
	//----------------------------------------------------
	var pathCopyImgFiles = [
		path.frontend.staticFiles_img + '/**/**/*.*',
		'!' + path.frontend.staticFiles_img + '/_**/**/*.*',
		'!' + path.frontend.staticFiles_img + '/**/_**/*.*',
		'!' + path.frontend.staticFiles_img + '/**/**/_*.*'
	]
	var pathCopyFontsFiles = [
		path.frontend.staticFiles_fonts + '/**/*.*',
		'!' + path.frontend.staticFiles_fonts + '/_**/*.*'
	]
	//----------------------------------------------------

	/**
	 * Tarea para copiar imagenes
	 * (gulp copy:img)
	 */
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

	/**
	 * Tarea para copiar sprites de imagenes
	 * (gulp copy:img:sprites)
	 */
	gulp.task('copy:img:sprites', function() {
		gulp.src(path.frontend.staticFiles_img + '/*_sprite.png', { base : path.frontend.staticFiles })
			.pipe(plugins.if(config.prod, plugins.imagemin({
				progressive: true,
				use: [ plugins.imageminPNG({optimizationLevel: 3}) ]
			})))
			.pipe(gulp.dest(path.dest.serverFiles + path.dest.static));
	});

	/**
	 * Tarea para copiar fuentes
	 * (gulp copy:fonts)
	 */
	gulp.task('copy:fonts', function() {
		gulp.src(pathCopyFontsFiles, { base : path.frontend.staticFiles })
			.pipe(gulp.dest(path.dest.serverFiles + path.dest.static));
	});

	/**
	 * Tarea para copiar librerías javascript con extensión *.js
	 * (gulp copy:js:libs)
	 *
	 * Hay casos donde las librerías que no están registradas en bower, se deben copian al proyecto
	 * con extensión .js (debido a que genera problemas al transformar a sintaxis coffee)
	 */
	gulp.task('copy:js:libs', function () {
    gulp.src(path.frontend.coffee + '/libs/*.js')
      .pipe(gulp.dest(path.dest.js + '/libs'));
  });
	
	/**
	 * Tarea principal
	 * (gulp copy)
	 */
	gulp.task('copy', function (callback) {
		plugins.runSequence('copy:img', 'copy:fonts',  callback);
	});

}


module.exports = Task;