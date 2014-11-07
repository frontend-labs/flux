/*!!
 * 
 * gulp path
 * @author: Jan Sanchez
 *
 */

var Path = {},
	Projects = {},
	d = new Date(),
	currentDate = '';

currentDate = d.getDate().toString() + "-" + (d.getMonth()+1).toString() + "-" + d.getFullYear().toString() + "_" + d.getHours().toString() + "-"+ d.getMinutes().toString();

Projects.default = { name : 'miproyecto' };

Path.src = { folder: '' };

Path.src.static = {
	main : Path.src.folder + 'static/'
};

Path.src.static.images = Path.src.static.main + 'img/';
Path.src.static.fonts = Path.src.static.main + 'fonts/';
Path.src.static.icons = Path.src.static.main + 'icons/';

Path.src.coffee = Path.src.folder + 'coffee/';
Path.src.jade = Path.src.folder + 'jadeflux/';
Path.src.stylus = Path.src.folder + 'stylus/';


Path.dest = { static: '../../src/public/static/' };

// No estoy seguro de esto, lo revisaremos luego
Path.dest.folder = Path.dest.static + Projects.default.name + '/';

Path.dest.css = Path.dest.folder + 'css/';
Path.dest.fonts = Path.dest.folder + 'fonts/';
Path.dest.images = Path.dest.folder + 'img/';
Path.dest.js = Path.dest.folder + 'js/';

Path.backend = {
	base: '../../src/pagoefectivomomo3/PM.WebApp/'
}

Path.backend.folder = Path.backend.base + 'Content/static/'+ Projects.default.name +'/';




/* Sprites Path */
Path.sprites = {
	mainSprite : {
		src: {
			images: Path.src.static.images + '_sprite/main_sprite/*.png'
		},
		dest: {
			stylus: Path.src.stylus + '_mixins/',
			image: Path.src.static.images
		}
	},
	secondSprite : {
		src: {
			images: Path.src.static.images + '_sprite/second_sprite/*.png'
		},
		dest: {
			stylus: Path.src.stylus + '_mixins/',
			image: Path.src.static.images
		}
	}
};

/* Icons Path */
Path.icons = {
	default : {
		src: {
			svgs: Path.src.static.icons + '*.svg',
			template: Path.src.static.icons + 'template/icons.styl'
		},
		dest: {
			stylus: Path.src.stylus + '_helpers/',
			fonts: Path.src.static.fonts + 'iconFonts/'
		}
	}
}

/* Jade Path */
Path.jade = {
	frontend : {
		src: [
			Path.src.jade + '*.jade',
			Path.src.jade + '**/*.jade',
			'!' + Path.src.jade + '_**/*.jade',
			'!' + Path.src.jade + '**/_*.jade'
		],
		dest: Path.dest.folder
	},
	backend : {
		src: [
			Path.src.jade + '**/*.jade',
			'!' + Path.src.jade + '_**/*.jade',
			'!' + Path.src.jade + '**/_*.jade'
		],
		dest: Path.dest.folder + 'backend/'
	}
};



/* Stylus Path */
Path.stylus = {
	default : {
		src: [
			Path.src.stylus + 'layouts/_render/*.styl', 
			Path.src.stylus + '**/*.styl',
			'!' + Path.src.stylus + '**/**/_**/*.styl',
			'!' + Path.src.stylus + '_**/*.styl',
			'!' + Path.src.stylus + '**/_*.styl'
		],
		dest: Path.dest.css
	}
};



/* Coffee Path */
Path.coffee = {
	default : {
		src: [
			Path.src.coffee + '**/*.coffee', 
			Path.src.coffee + 'libs/**/*.coffee',
			'!' + Path.src.coffee + '_**/*.coffee',
			'!' + Path.src.coffee + '**/_*.coffee'
		],
		dest: Path.dest.js + 'source/'
	}
};



/* Javascript Path */
Path.javascript = {
	default: {
		src: [
			Path.dest.js + 'source/' + 'scripts/**/*.js'
		],
		dest: Path.dest.js + 'dist/scripts/'
	},
	lint: [
		Path.dest.js + 'source/**/*.js',
		'!'+ Path.dest.js +'source/libs/**/*.js'
	],
	complexity: [
		Path.dest.js + 'source/**/*.js',
		'!'+ Path.dest.js +'source/libs/**/*.js'
	]
};




/* Copy Path */
Path.copy = {
	js: {
		libs: {
			base: Path.dest.js + 'source/libs/',
			src: [
				Path.dest.js + 'source/libs/**/*.js'
			],
			dest: Path.dest.js + 'dist/libs/'
			
		}
	},
	fonts: {
		src: [
			Path.src.static.fonts + '**/**/*.*'
		],
		dest: Path.dest.fonts
	},
	images: {
		source: {
			src: [
				Path.src.static.images + '**/**/*.*',
				'!' + Path.src.static.images + '_**/**/*.*',
				'!' + Path.src.static.images + '**/_**/*.*',
				'!' + Path.src.static.images + '**/**/_*.*'
			],
			dest: Path.dest.images
		},
		sprites: {
			src: [
				Path.src.static.images + '*_sprite.png'
			],
			dest: Path.dest.images
		}
	},
	backend: {
		cshtml: {
			src: {
				layouts: [Path.dest.folder + 'backend/layout/*.*'],
				views: [Path.dest.folder + 'backend/modules/momo/**/**/*.*']
			},
			dest: {
				layouts: Path.backend.base + 'Views/Shared/',
				views: Path.backend.base + 'Views/'
			}
		},
		static: {
			src: [
				Path.dest.folder + '**/**/*.*'
			],
			dest: Path.backend.base + 'Content/static/momo/'
		},
		resources:{
			src: [
				'resources/temp/yosonjs-utils.js'
			],
			dest: Path.backend.base + 'Content/static/momo/js/dist/libs/yosonjs-utils/'
		}
	}
};



/* Clean Path */
Path.clean = {
	html: {
		frontend: [
			Path.dest.folder + 'modules/',
			Path.dest.folder + 'layout/',
			Path.dest.folder + 'index.html'
		],
		backend: [
			Path.dest.folder + 'backend/'
		]
	},
	sprites: {
		mainSprite: [
			Path.src.stylus + '_mixins/' + 'main_sprite.styl',
			Path.src.static.images + 'main_sprite.png',
			Path.dest.images + 'main_sprite.png'
		],
		secondSprite: [
			Path.src.stylus + '_mixins/' + 'second_sprite.styl',
			Path.src.static.images + 'second_sprite.png',
			Path.dest.images + 'second_sprite.png'
		]
	},
	styles: {
		default: [Path.dest.css]
	},
	fonts: {
		default: [Path.dest.fonts]
	},
	images: {
		default: [Path.dest.images]
	},
	js: {
		scripts: [
			Path.dest.js + 'source',
			Path.dest.js + 'dist/scripts'
		]
	},
	backend: {
		html: [
			Path.backend.folder + 'modules/',
			Path.backend.folder + 'layout/',
			Path.backend.folder + 'index.html',
			Path.backend.folder + 'backend/',
			Path.backend.folder + 'js/dist/libs/yosonjs-utils/yosonjs-utils.js'
		]
	},
	zip: {
		backend: ['../../src/' + 'backend-' + '*.zip']
	}
};

/* Watch Paths */
Path.watch = {
	jade: [Path.src.jade + '**/*.jade'],
	stylus: [Path.src.stylus + '**/*.styl'],
	coffee: [Path.src.coffee + '**/*.coffee']
};


/* Zip Path */
Path.zip = {
	backend: {
		src: [
			'../../src/pagoefectivomomo3/**/**/*.*'
		],
		dest: '../../src/'
	}
};

/* Email Path */
Path.email = {
	backend: {
		src: [
			'resources/gulp/email.html'
		]
	}
};



module.exports = Path;



