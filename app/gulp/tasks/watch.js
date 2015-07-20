var gulp = require('gulp');
var config = require('../config').watch;
var runSequence = require('run-sequence');
var browsersync = require('browser-sync');
var watch = require('gulp-watch');
var reload = browsersync.reload;


/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('watch-local', ['watch_sass', 'watch_js', 'watch_translation', 'watch_html'], function () {
    console.log('watching files');
});

gulp.task('watch_sass', function () {
    console.log('watch_sass');
    watch(config.sass, function () {
        gulp.start('sass-reload-local');
    });
});

gulp.task('watch_js', function () {
    console.log('watch_js');
    watch(config.javascript, function () {
        gulp.start('javascript-reload-local');
    });
});

gulp.task('watch_translation', function () {
    console.log('watch_translation');
    watch(config.translation, function () {
        gulp.start('html-reload');
    });
});

gulp.task('watch_html', function () {
    console.log('watch_html');
    watch(config.html, function () {
        gulp.start('html-reload');
    });
});

/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('watch-remote', function () {
    gulp.watch(config.html, ['html-reload']);
    gulp.watch(config.sass, ['sass-reload-remote']);
    gulp.watch(config.javascript, ['javascript-reload-remote']);
});

/* Reloading the sass creation and calling the page relaod */
gulp.task('html-reload', function (callback) {
    runSequence(
        'browsersync-reload',
        callback);
});

/* Reloading the sass creation and calling the page relaod */
gulp.task('sass-reload-local', function (callback) {
    runSequence(
        'sass-local',
        'browsersync-reload',
        'css-rsync',
        'scsslint',
        callback);
});

/* Reloading the sass creation and calling the page relaod */
gulp.task('sass-reload-remote', function (callback) {
    runSequence(
        'sass-remote',
        'css-rsync',
        'browsersync-reload',
        'scsslint',
        callback);
});

/* Reloading the js creation and calling the page relaod */
gulp.task('javascript-reload-local', function (callback) {
    runSequence(
        'javascript-local',
        'browsersync-reload',
        'js-rsync',
        callback);
});

/* Reloading the js creation and calling the page relaod */
gulp.task('javascript-reload-remote', function (callback) {
    runSequence(
        'javascript-remote',
        'js-rsync',
        'browsersync-reload',
        callback);
});

/* Task to Reload the devices */
gulp.task('browsersync-reload', function () {
    browsersync.reload();
});
