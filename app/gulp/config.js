var development = './src/Application/AppBundle/Resources/public/';
var production = './web/min/';

var staticImages = development + 'img/';

var originSassFiles = development + '/scss/builds/main.scss';
var destCssFiles = production + 'css/';
var destJsFiles = production + 'js/';

var configJson = require('./parameters.json');

var productionPath = '/home/bravoure/_subdomains/' + configJson.parameters.host + '/' + production;

module.exports = {
    variables: {
        development: development,
        production: production,
        staticImages: staticImages,
        originSassFiles: originSassFiles,
        destCssFiles: destCssFiles,
        destJsFiles: destJsFiles,
        viewDirectory: development
    },
    browsersync_local: {
        development: {
            logLevel: "debug",
            notify: true,
            proxy: 'http://' + configJson.parameters.host.replace('.nl', '.local') + '/app_dev.php',
            port: 9000
        },
        production: {
            server: {
                baseDir: [production]
            },
            port: 9998
        }
    },
    browsersync: {
        development: {
            logLevel: "debug",
            notify: true,
            proxy: 'http://' + configJson.parameters.host + '/app_dev.php',
            port: 9000
        },
        production: {
            server: {
                baseDir: [production]
            },
            port: 9998
        }
    },
    delete: {
        src: [development + 'css/*']
    },
    sass_remote: {
        src: originSassFiles,
        dest: destCssFiles,
        options: {
            outputStyle: 'compressed',
            precision: 10,
            includePaths: ['.'],
            //onError: console.error.bind(console, 'Sass error:'),
            noCache: false,
            compass: false,
            bundleExec: true,
            errLogToConsole: true,
            sourcemap: true,
            sourcemapPath: './web/min/css',
            sourceComments: 'map'
        }
    },
    sass_local: {
        src: originSassFiles,
        dest: destCssFiles,
        options: {
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.'],
            //onError: console.error.bind(console, 'Sass error:'),
            noCache: true,
            compass: false,
            bundleExec: true,
            errLogToConsole: true,
            sourcemap: true,
            sourcemapPath: './web/min/css',
            sourceComments: 'map'
        }
    },
    cmq: {
        src: destCssFiles
    },
    autoprefixer: {
        browsers: [
            'last 2 versions',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
        ],
        cascade: true
    },
    browserify: {
        // Enable source maps
        debug: true,
        // Additional file extensions to make optional
        //extensions: ['.coffee', '.hbs'],
        extensions: [],
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [
            {
                entries: development + '/js/application/components/menu.js',
                dest: development + 'js',
                outputName: 'application.js'
            },
            {
                entries: development + '/js/head/*.js',
                dest: development + 'js',
                outputName: 'head.js'
            }
        ]
    },

    javascript: {
        src: [
            development + 'js/libs/*.js',
            development + 'js/libs/outdatedbrowser/*.js',
            development + 'js/component/*.js',
            development + 'js/resources/*.js',
            development + 'js/*.js'
        ],
        dest: production + 'js'
    },
    images: {
        src: development + 'img/**/*',
        dest: development + 'img'
    },
    /*  copyfonts: {
     development: {
     src:  srcAssets + 'fonts/*',
     dest: developmentAssets + 'fonts'
     },
     production: {
     src:  developmentAssets + 'fonts/*',
     dest: productionAssets + 'fonts'
     }
     },*/
    base64: {
        src: development + 'css/*.css',
        dest: development + 'css',
        options: {
            baseDir: development,
            extensions: ['png'],
            maxImageSize: 20 * 1024, // bytes
            debug: false
        }
    },
    watch: {
        sass: development + 'scss/**/*.{sass,scss}',
        javascript: development + 'js/**/*.js',
        html: 'src/**/*.twig',
        translation: 'app/Resources/translations/*.xliff',
        images: development + 'img/**/*',
        sprites: development + 'images/**/*.png',
        svg: development + 'vectors/*.svg'

    },
    scsslint: {
        src: [
            development + 'scss/**/*.{sass,scss}',
            '!' + development + 'scss/component/animate.scss',
            '!' + development + 'scss/component/icon-burger.scss',
            '!' + development + 'scss/component/scroll_icon.scss',
            '!' + development + 'scss/helper/*'
        ],
        options: {
            'maxBuffer': 507200,
            'config': './.scss-lint.yml',
            'filePipeOutput': 'scssReport.json'
        }
    },
    jshint: {
        src: development + 'js/application/**/*.js'
    },
    sprites: {
        src: development + 'images/sprites/icon/*.png',
        dest: {
            css: development + 'scss/base/',
            image: development + 'images/sprites/'
        },
        options: {
            cssName: '_sprites.scss',
            cssFormat: 'css',
            cssOpts: {
                cssClass: function (item) {
                    // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
                    if (item.name.indexOf('-hover') !== -1) {
                        return '.icon-' + item.name.replace('-hover', ':hover');
                        // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
                    } else {
                        return '.icon-' + item.name;
                    }
                }
            },
            imgName: 'icon-sprite.png',
            imgPath: '/assets/images/sprites/icon-sprite.png'
        }
    },
    optimize: {
        css: {
            src: production + 'css/*.css',
            dest: production + 'css/',
            options: {
                keepSpecialComments: 0
            }
        },
        js: {
            src: development + 'js/*.js',
            dest: production + 'js/',
            options: {}
        },
        images: {
            src: staticImages + '**/**/*.{jpg,jpeg,png,gif}',
            dest: staticImages + '',
            options: {
                optimizationLevel: 3,
                progessive: true,
                interlaced: true
            }
        },
        html: {
            src: production + '**/*.html',
            dest: production,
            options: {
                collapseWhitespace: true
            }
        }
    },
    revision: {
        src: {
            assets: [
                production + 'css/*.css',
                production + 'js/*.js',
                production + 'images/**/*'
            ],
            base: production
        },
        dest: {
            assets: production,
            manifest: {
                name: 'manifest.json',
                path: production
            }
        }
    },
    collect: {
        src: [
            production + 'manifest.json',
            production + '/**/*.{html,xml,txt,json,css,js}',
            '!' + production + 'feed.xml'
        ],
        dest: production
    },
    rsync: {
        src: production + 'js/*.js',
        options: {
            destination: productionPath,
            root: production,
            hostname: 'server01.bravoure.nl',
            username: 'bravoure',
            password: true,
            incremental: true,
            progress: true,
            relative: true,
            emptyDirectories: true,
            recursive: true,
            clean: true,
            exclude: ['.DS_Store'],
            include: []
        }
    },
    ftp: {
        host: 'bravoure.nl',
        user: 'bravoure',
        password: 'ZBskvJ&Mv{MK',
        parallel: 10,
        path: '/_subdomains/' + configJson.parameters.host
    },
    webp: {
        src: production + 'images/**/*.{jpg,jpeg,png}',
        dest: production + 'images/',
        options: {}
    },
    gzip: {
        src: production + '**/*.{html,xml,json,css,js}',
        dest: production,
        options: {}
    }
};
