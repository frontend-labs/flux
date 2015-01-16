/*!!
*
* Tareas para generar, concatenar, lintear Javascript
*
* tarea principal: gulp js
*/

function Task(gulp, path, options, plugins, settings) {

    gulp.task('coffee', function() {
        return gulp.src(path.coffee.default.src)
        //.pipe(plugins.sourcemaps.init())
        .pipe(plugins.plumber())
        .pipe(plugins.coffee(options.coffee.general).on('error', function(err){
            console.log('');
            console.log(err.name + " in " + err.plugin);
            console.log('Message: ' + err.message);
            console.log('Stack: ' + err.stack);

            /*
            var isLinux = /^linux/.test(process.platform);
            if (isLinux){
                plugins.notifier.notify({
                    title: 'Plugin: ' + err.plugin,
                    message: err.name + ' in ' + err.plugin,
                    contentImage: __dirname + "/resources/gulp/img/logo.png",
                    appIcon: __dirname + "/resources/gulp/img/logo.png",
                    open: "file://" + __dirname + "/resources/gulp/img/logo.png"
                }, function(error, response) {
                    console.log(response);
                });
            }
            */

        }))
        //.pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(path.coffee.default.dest));
    });

    gulp.task('concat:js', function(){
        gulp.src(path.javascript.default.src)
            .pipe(plugins.recursiveConcat(options.concat.js.recursiveConcat))
            .pipe(gulp.dest(path.javascript.default.dest))
            .pipe(plugins.if(settings.config.prod, plugins.rename(options.concat.js.rename)))
            .pipe(plugins.if(settings.config.prod, plugins.sourcemaps.init()))
            .pipe(plugins.if(settings.config.prod, plugins.uglify(options.concat.js.uglify)))
            .pipe(plugins.if(settings.config.prod, plugins.sourcemaps.write('./', {includeContent: false, sourceRoot: ''})))
            .pipe(plugins.if(settings.config.prod, gulp.dest(path.javascript.default.dest)))

            .pipe(plugins.filter(['**/*.min.js.map']))
            .pipe(plugins.es.map(function (data, cb) {
                arrayFiles = data.relative.split('/');
                currentFileName = arrayFiles[arrayFiles.length-1].replace('.min.js.map', '');
                newDataContents = data.contents.toString().replace('[\"?\"]','["'+ currentFileName +'.js"]');
                data.contents = new plugins.Buffer(newDataContents, 'utf8');
                cb(null, data);
            }))
            .pipe(plugins.if(settings.config.prod, gulp.dest(path.javascript.default.dest)))

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

}

module.exports = Task;
