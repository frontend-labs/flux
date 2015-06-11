/*!!
 *
 * gulp options
 * @author: Jan Sanchez
 *
 */

var path = require('./path'),
	jadeLocals = require('./jade'),
	d = new Date(),
	currentDate = '';

currentDate = d.getDate().toString() + "-" + (d.getMonth()+1).toString() + "-" + d.getFullYear().toString() + "_" + d.getHours().toString();


var Options = {};

/* Clean Options */
Options.clean = {
	general: {
		src: {read: false},
		plugin: {force: true}
	}
};


/* Copy Options */
Options.copy = {
	general: {
		src: {read: false}
	}
};


/* Sprites Options */
Options.sprites = {
	mainSprite : {
		algorithm: 'binary-tree',
		imgName: 'main_sprite.png',
		cssName: 'main_sprite.styl',
		imgPath: '../../../img/main_sprite.png',
	},
	secondSprite : {
		algorithm: 'binary-tree',
		imgName: 'second_sprite.png',
		cssName: 'second_sprite.styl',
		imgPath: '../../../img/second_sprite.png',
	},
	aladinoRunning : {
		algorithm: 'binary-tree',
		imgName: 'aladino_running.png',
		cssName: 'aladino_running.styl',
		imgPath: '../../../img/aladino_running.png',
		algorithmOpts: {sort: false}
	}
};

Options.icons = {
	default : {
		generator : { fontName: 'iconFonts-webfont', appendCodepoints: true }
	}
}

/* Jade Options */
Options.jade = {
	frontend : {
		pretty: true,
		locals: jadeLocals,
		rename: {extname: '.html'}
	},
	backend : {
		pretty: true,
		locals: jadeLocals,
		rename: {extname: '.cshtml'}
	}
};


/* Stylus Options */
Options.stylus = {
	default : {
		compress: false,
		linenos: false,
		minify: { keepBreaks: true, keepSpecialComments: '*', benchmark: false},
		size: { title: 'styles' },
		autoprefixer: [
			'ie >= 8',
			'ie_mob >= 10',
			'ff >= 30',
			'chrome >= 34',
			'safari >= 7',
			'opera >= 23',
			'ios >= 7',
			'android >= 4.4',
			'bb >= 10'
		],
		versioner: {
			lastcommit: true
		}
	}
};


/* Coffee Options */
Options.coffee = {
	general: {bare: true}
};


/* browserSync Options */
Options.browserSync = {
	//browser: ["google-chrome"]
};


/* Concat Options */
Options.concat = {
	js: {
		recursiveConcat: {dist: path.javascript.default.dest, extname: '.js'},
		uglify: {mangle:false, compress: {drop_console: false}},
		rename: {extname: '.min.js'}
	}
};


/* Lint Options */
Options.js = {
	lint: {
		jshintrc: './gulp/.jshintrc',
		reporterStyle: 'jshint-stylish',
		reporter: 'fail'
	}
};


/* imagemin Options */
Options.imagemin = {
	general: {
		progressive: true,
		interlaced: true
	}
};


/* Zip Options */
Options.zip = {
	backend: {
        file: 'backend-' + currentDate + '.zip'
	}
};


/* Email Options */
Options.email = {
	general: {
        key: 'api:key-bfc71afead753d73cef11c5485c1fd2b',
        url: 'https://api.mailgun.net/v2/sandbox4a0fe54c0059454483eff6624145da45.mailgun.org/messages'
	}
};

Options.email.backend = {
	user: Options.email.general.key,
	url: Options.email.general.url,
	form: {
		from: 'Jan Sanchez <joejansanchez@gmail.com>',
		to: 'Jan Sanchez <joejansanchez@gmail.com>',
		bcc: 'Jan Sanchez <joejansanchez@gmail.com>',
		subject: 'Actualización: HTML - ' + currentDate
	}
};

module.exports = Options;
