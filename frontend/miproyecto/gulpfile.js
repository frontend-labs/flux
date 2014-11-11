/*!!
 *
 * gulpfile.js
 * @author: Jan Sanchez
 *
 */

var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    stylish     = require('jshint-stylish'),
    notify      = require("node-notifier"),
    changelog   = require('conventional-changelog'),
    fs          = require('fs'),
    loadPlugins = require('gulp-load-plugins'),
    package     = require('./package.json'),
    path        = require('./gulp/path'),
    options     = require('./gulp/options'),
    jadeLocals  = require('./gulp/jade'),
    config      = require('./gulp/config.local');

var reload = browserSync.reload,
    notifier = new notify(),
    plugins = loadPlugins();

plugins.minifyCSS = require('gulp-minify-css');
plugins.recursiveConcat = require('gulp-recursive-concat');
plugins.runSequence = require('run-sequence');
plugins.spritesmith = require('gulp.spritesmith');
plugins.iconfont = require('gulp-iconfont');
plugins.consolidate = require('gulp-consolidate');

var coffeeTasks = ['js', reload],
    jadeTasks = ['html:frontend', reload],
    stylusTasks = ['styles', reload];

var d = new Date(),
    currentDate = d.getDate().toString() + "-" + (d.getMonth()+1).toString() + "-" + d.getFullYear().toString() + "_" + d.getHours().toString();

/*!!
*
* Tareas individuales para limpiar los archivos generados
*
* tarea principal: gulp clean
*/

gulp.task('clean:html:frontend', function () {
    return gulp.src(path.clean.html.frontend, options.clean.general.src)
    .pipe(plugins.rimraf(options.clean.general.plugin));
});

gulp.task('clean:html:backend', function () {
    return gulp.src(path.clean.html.backend, options.clean.general.src)
    .pipe(plugins.rimraf(options.clean.general.plugin));
});

gulp.task('clean:html', function (cb) {
    plugins.runSequence([
        'clean:html:frontend',
        'clean:html:backend'
        ], cb);
});

gulp.task('clean:styles', function () {
    return gulp.src(path.clean.styles.default, options.clean.general.src)
    .pipe(plugins.rimraf(options.clean.general.plugin));
});

gulp.task('clean:images', function () {
    return gulp.src(path.clean.images.default, options.clean.general.src)
    .pipe(plugins.rimraf(options.clean.general.plugin));
});

gulp.task('clean:fonts', function () {
    return gulp.src(path.clean.fonts.default, options.clean.general.src)
    .pipe(plugins.rimraf(options.clean.general.plugin));
});

gulp.task('clean:js:scripts', function () {
    return gulp.src(path.clean.js.scripts, options.clean.general.src)
    .pipe(plugins.rimraf(options.clean.general.plugin));
});

gulp.task('clean:js', function (cb) {
    plugins.runSequence('clean:js:scripts', cb);
});

gulp.task('clean', function (cb) {
    plugins.runSequence(['clean:html', 'clean:styles', 'clean:images', 'clean:fonts', 'clean:js'], cb);
});


/*!!
*
* Tareas para generar, concatenar, lintear Javascript
*
* tarea principal: gulp js
*/

gulp.task('coffee', function() {
    return gulp.src(path.coffee.default.src)
    .pipe(plugins.coffee(options.coffee.general).on('error', function(err){
        console.log('');
        console.log(err.name + " in " + err.plugin);
        console.log('Message: ' + err.message);
        console.log('Stack: ' + err.stack);

        var isLinux = /^linux/.test(process.platform);
        if (isLinux){
            notifier.notify({
                title: 'Plugin: ' + err.plugin,
                message: err.name + ' in ' + err.plugin,
                contentImage: __dirname + "/resources/gulp/img/logo.png",
                appIcon: __dirname + "/resources/gulp/img/logo.png",
                open: "file://" + __dirname + "/resources/gulp/img/logo.png"
            }, function(error, response) {
                console.log(response);
            });
        }

    }))
    .pipe(gulp.dest(path.coffee.default.dest));
});


gulp.task('concat:js', function(){
    gulp.src(path.javascript.default.src)
        .pipe(plugins.recursiveConcat(options.concat.js.recursiveConcat))
        .pipe(plugins.if(config.prod, plugins.uglify(options.concat.js.uglify)))
        .pipe(gulp.dest(path.javascript.default.dest));
});


gulp.task('lint', function() {
    return gulp.src(path.javascript.lint)
        .pipe(plugins.jshint(options.js.lint.jshintrc))
        .pipe(plugins.jshint.reporter(options.js.lint.reporterStyle))
        .pipe(plugins.jshint.reporter(options.js.lint.reporter));
});


gulp.task('complexity', function(){
    return gulp.src(path.javascript.complexity)
    .pipe(plugins.complexity());
});

gulp.task('js', function(cb) {
    plugins.runSequence('js:default', 'copy:js:libs', cb);
});

gulp.task('js:default', function(cb) {
    plugins.runSequence('coffee', 'concat:js', 'lint', cb);
});

gulp.task('js:complex', ['js'], function() {
    gulp.start('complexity');
    console.log('Just write good Javascript.');
});

/*!!
*
* Tarea para generar, prefixear y minimizar Css
*
* tarea principal: gulp styles
*/

gulp.task('styles', function () {
    return gulp.src(path.stylus.default.src)
    .pipe(plugins.stylus(options.stylus.default))
    .pipe(plugins.if(config.prod, plugins.cssUrlVersioner(options.stylus.default.versioner)))
    .pipe(plugins.autoprefixer(options.stylus.default.autoprefixer))
    .pipe(plugins.cssshrink())
    .pipe(plugins.if(config.prod, plugins.minifyCSS(options.stylus.default.minify)))
    //.pipe(plugins.debug())
    .pipe(gulp.dest(path.stylus.default.dest))
    .pipe(plugins.size(options.stylus.default.size));
});

/*!!
*
* Tareas para generar .html y .cshtml
*
* tarea principal: gulp html
*/

gulp.task('html:frontend', function() {
    return gulp.src(path.jade.frontend.src)
    .pipe(plugins.jade(options.jade.frontend))
    .pipe(plugins.rename(options.jade.frontend.rename))
    .pipe(gulp.dest(path.jade.frontend.dest))
});


gulp.task('html:backend', function() {
    return gulp.src(path.jade.backend.src)
    .pipe(plugins.jade(options.jade.backend))
    .pipe(plugins.rename(options.jade.backend.rename))
    .pipe(gulp.dest(path.jade.backend.dest))
});


gulp.task('html', function(cb) {
    plugins.runSequence('html:frontend', 'html:backend', cb);
});


/*!!
*
* Tareas para generar sprites png
*
* tarea principal: gulp sprites
*/

gulp.task('sprites', function () {
    var mainData = gulp.src(path.sprites.mainSprite.src.images)
        .pipe(plugins.spritesmith(options.sprites.mainSprite));

    mainData.img.pipe(gulp.dest(path.sprites.mainSprite.dest.image));
    mainData.css.pipe(gulp.dest(path.sprites.mainSprite.dest.stylus));

    var secondData = gulp.src(path.sprites.secondSprite.src.images)
        .pipe(plugins.spritesmith(options.sprites.secondSprite));

    secondData.img.pipe(gulp.dest(path.sprites.secondSprite.dest.image));
    secondData.css.pipe(gulp.dest(path.sprites.secondSprite.dest.stylus));

    gulp.start('copy:img:sprites');

});


/*!!
*
* Tareas para copiar archivos
*
* tarea principal: gulp copy
*/

gulp.task('copy:js:libs', function () {
    gulp.src(path.copy.js.libs.src, {
            base: path.copy.js.libs.base
        })
        .pipe(plugins.if(config.prod, plugins.uglify(options.concat.js.uglify)))
        .pipe(gulp.dest(path.copy.js.libs.dest));
});

gulp.task('copy:js', ['copy:js:libs'], function () {
    return;
});

gulp.task('copy:fonts', function () {
    gulp.src(path.copy.fonts.src, path.dest.fonts)
        .pipe(gulp.dest(path.copy.fonts.dest));
});

gulp.task('copy:img', function () {
    gulp.src(path.copy.images.source.src, path.dest.images)
        .pipe(plugins.if(config.prod, plugins.imagemin(options.imagemin.general)))
        .pipe(gulp.dest(path.copy.images.source.dest));
});

gulp.task('copy:img:sprites', function () {
    gulp.src(path.copy.images.sprites.src, path.dest.images)
        .pipe(plugins.if(config.prod, plugins.imagemin(options.imagemin.general)))
        .pipe(gulp.dest(path.copy.images.sprites.dest));
});


gulp.task('copy', function (cb) {
    plugins.runSequence('copy:js', 'copy:img', 'copy:fonts', cb);
});


/*!!
*
* Tareas para generar fuente de iconos
*
* tarea principal: gulp icons
*/

gulp.task('compileIcons', function(){
    gulp.src([path.icons.default.src.svgs])
        .pipe(plugins.iconfont(options.icons.default.generator))
        .on('codepoints', function(codepoints, options) {
            gulp.src(path.icons.default.src.template)
            .pipe(plugins.consolidate('lodash', {
                glyphs: codepoints,
                fontName: 'iconFonts',
                className: 'icon'
            }))
            .pipe(gulp.dest(path.icons.default.dest.stylus));
        })
        .pipe(gulp.dest(path.icons.default.dest.fonts));
});

gulp.task('icons', function() {
    plugins.runSequence('compileIcons', 'copy:fonts', 'styles', function(){
        console.log('Solo Fuente de iconos.');
    });
});


/*!!
*
* Tareas para generar fuentes de texto
*
* tarea principal: gulp fonts
*/

gulp.task('compileFonts', function(){
    fs.readdir(path.src.static.fonts, function(err, files) {
        if (err) throw err;
        var dirList = files.filter(function(file) { return (/^[^_]*$/g).test(file); });
        gulp.src(path.fonts.default.src.template)
        .pipe(plugins.consolidate('lodash', { dirList: dirList }))
        .pipe(gulp.dest(path.fonts.default.dest.stylus));

    })
});

gulp.task('fonts', function() {
    plugins.runSequence('compileFonts', 'styles', function(){
        console.log('Solo Fuente de letras.');
    });
});

/*!!
*
* Tareas para correr un servidor local con browserSync
*
* tarea principal: gulp watch
*/

gulp.task('server', function () {
    return browserSync({
        server: {
            baseDir: path.dest.folder
        },
        browser: options.browserSync.browser
    });
});


gulp.task('watch', function () {

    gulp.start('server');

    gulp.watch(path.watch.jade, jadeTasks);
    gulp.watch(path.watch.coffee, coffeeTasks);
    gulp.watch(path.watch.stylus, stylusTasks);
});


/*!!
*
* Tareas por default
*
* tarea principal: gulp
*/

gulp.task('default', ['clean'], function (cb) {
    plugins.runSequence('sprites', 'styles', 'js:default', 'copy', 'html', cb);
});


/*!!
*
* Tareas extra para .net
*
* tarea principal: gulp backend
*/

gulp.task('copy:backend:cshtml:views', function () {
    return gulp.src(path.copy.backend.cshtml.src.views)
        .pipe(gulp.dest(path.copy.backend.cshtml.dest.views));
});

gulp.task('copy:backend:cshtml:layouts', function () {
    return gulp.src(path.copy.backend.cshtml.src.layouts)
        .pipe(gulp.dest(path.copy.backend.cshtml.dest.layouts));
});

gulp.task('copy:backend:cshtml', function (cb) {
    plugins.runSequence(
        'copy:backend:cshtml:views',
        'copy:backend:cshtml:layouts',
        cb);
});

gulp.task('copy:backend:static', function () {
    return gulp.src(path.copy.backend.static.src, path.copy.backend.static.dest)
        .pipe(gulp.dest(path.copy.backend.static.dest));
});


gulp.task('copy:backend:resources', function () {
    return gulp.src(path.copy.backend.resources.src, path.copy.backend.resources.dest)
        .pipe(gulp.dest(path.copy.backend.resources.dest));
});


gulp.task('clean:backend', function () {
    return gulp.src(path.clean.backend.html, options.clean.general.src)
    .pipe(plugins.rimraf(options.clean.general.plugin));
});

gulp.task('clean:zip', function () {
    return gulp.src(path.clean.zip.backend, options.clean.general.src)
    .pipe(plugins.rimraf(options.clean.general.plugin));
});

gulp.task('zip:backend', function () {
    return gulp.src(path.zip.backend.src)
        .pipe(plugins.zip(options.zip.backend.file))
        .pipe(gulp.dest(path.zip.backend.dest));
});

gulp.task('email:backend', function () {
    options.email.backend.form.attachment = '@../../src/' + options.zip.backend.file;

    return gulp.src(path.email.backend.src)
    .pipe(plugins.email(options.email.backend, function(data, error){
        console.log(data);
        })
    );
});

gulp.task('backend', ['clean:zip'], function (cb) {
    plugins.runSequence(
        'copy:backend:cshtml',
        'copy:backend:static',
        'clean:backend',
        'copy:backend:resources',
        'zip:backend',
        'email:backend',
        cb);
});



/*!!
*
* Tareas para changelog, tag
*
* tarea principal: gulp
*/


gulp.task('log', function () {
    return changelog({
        repository: package.repository.url,
        version: package.version
    }, function(err, log) {
        fs.writeFileSync('CHANGELOG.md', log, 'utf8');
    });
});

gulp.task('bump', function(){
    return gulp.src(['./package.json', './bower.json'])
    .pipe(plugins.bump())
    .pipe(gulp.dest('./'))
    .pipe(plugins.filter('package.json'))
    .pipe(plugins.tagVersion());
});

gulp.task('version', function (cb) {
    plugins.runSequence(['log', 'bump'], cb);
});
