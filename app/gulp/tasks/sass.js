var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('../config');

var browsersync = require('browser-sync');
var reload = browsersync.reload;

var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
//var sass         = require('gulp-sass');
//var gulpFilter   = require('gulp-filter');
//var autoprefixer = require('gulp-autoprefixer');
//var sourcemaps   = require('gulp-sourcemaps');

/**
 * Generate CSS from SCSS
 * Build sourcemaps
 */
var onError = function (err) {
    gutil.beep();
    console.log(err);

    this.emit('end');
};

gulp.task('sass-local', function () {
    var sassConfig = config.sass_local.options;

    sassConfig.onError = browsersync.notify;

    console.log('sass generating');

    // Don’t write sourcemaps of sourcemaps
    var filter = $.filter(['*.css', '!*.map']);

    browsersync.notify('Compiling Sass');

    gulp.start('assets');

    return gulp.src(config.sass_local.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        //.pipe($.sass(sassConfig))
        .pipe($.sass(sassConfig))
        .pipe($.sourcemaps.init())
        .pipe($.autoprefixer(config.autoprefixer))
        .pipe(filter) // Don’t write sourcemaps of sourcemaps
        .pipe($.sourcemaps.write('.', { includeContent: false }))
        .pipe(filter.restore()) // Restore original files
        .pipe(gulp.dest(config.sass_local.dest))
        .pipe($.buster())
        .pipe(gulp.dest('.'));
});

gulp.task('sass-remote', function () {
    var sassConfig = config.sass_remote.options;

    sassConfig.onError = browsersync.notify;

    console.log('sass generating');

    // Don’t write sourcemaps of sourcemaps
    var filter = $.filter(['*.css', '!*.map']);

    browsersync.notify('Compiling Sass');

    return gulp.src(config.sass_remote.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe($.sass(sassConfig))
        .pipe($.sourcemaps.init())
        .pipe($.autoprefixer(config.autoprefixer))
        .pipe(filter) // Don’t write sourcemaps of sourcemaps
        .pipe($.sourcemaps.write('.', { includeContent: true }))
        .pipe(filter.restore()) // Restore original files
        .pipe(gulp.dest(config.sass_remote.dest));
});
