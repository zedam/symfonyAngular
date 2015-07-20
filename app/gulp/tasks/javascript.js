var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var config = require('../config').javascript;

var onError = function (err) {
    gutil.beep();
    console.log(err);

    this.emit('end');
};

gulp.task('javascript-remote', function () {
    'use strict';
    console.log('js generating');
    gulp.start('assets');

    gulp.src(config.src)
        .pipe(sourcemaps.init())
        .pipe(uglify('app.min.js', {
            outSourceMap: true,
            output: {
                beautify: false
            }
        }).on('error', function (e) {

                gutil.beep();
                console.log(e);

                this.emit('end');
            }))

        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest));
});



gulp.task('javascript-local', function () {
    'use strict';
    console.log('js generating');

    gulp.start('assets');
    gulp.src(config.src)
        .pipe(sourcemaps.init())
        .pipe(uglify('app.min.js', {
            outSourceMap: true,
            output: {
                beautify: true
            }
        }).on('error', function (e) {

            gutil.beep();
            console.log(e);

            this.emit('end');
        }))

        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest));
});
