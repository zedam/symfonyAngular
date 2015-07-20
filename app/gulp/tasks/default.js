var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browsersync = require('browser-sync');
var runSequence = require('run-sequence');
var reload = browsersync.reload;
var config = require('../config').browsersync;
var config_cmq = require('../config').cmq;
var remote_rsync;
var location;
var cmq = require('gulp-combine-media-queries');

gulp.task('cmq', function () {
    console.log(config_cmq.src);
    gulp.src(config_cmq.src)
        .pipe(cmq({
            log: true
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('default', function (callback) {
    runSequence(
        ['json_data'],
        'local',
        callback);
});

gulp.task('remote', function (callback) {
    runSequence(
        ['sass-remote', 'javascript-remote'],
        ['remote_console', 'css-rsync', 'js-rsync'],
        'browsersync-remote',
        'scsslint',
        'watch-remote',
        callback);
});

gulp.task('local', function (callback) {
    runSequence(
        'json_data',
        ['sass-local', 'javascript-local'],
        'local_console',
        'browsersync-local',
        'scsslint',
        'watch-local',
        'gmq',
        ['css-rsync', 'js-rsync'],
        callback);
});

gulp.task('build-local', function (callback) {
    runSequence(
        ['sass-local', 'javascript-local'],
        ['cmq'],
        ['local_console'],
        'browsersync-local',
        'watch-local',
        callback);
});

gulp.task('build', function (callback) {
    runSequence(
        ['sass-remote', 'javascript-remote', 'optimize:images'],
        ['cmq'],
        ['remote_console', 'css-rsync', 'js-rsync'],
        'browsersync-local',
        'watch-local',
        callback);
});

gulp.task('local_console', function () {
    console.log('LOCAL');
});

gulp.task('remote_console', function () {
    console.log('REMOTE');
});
