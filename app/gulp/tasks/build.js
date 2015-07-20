var gulp         = require('gulp');
var runSequence  = require('run-sequence');
var browsersync  = require('browser-sync');
var reload       = browsersync.reload;
var config       = require('../config').browsersync.development;

/**
 * Run all tasks needed for a build in defined order
 */
/*gulp.task('build', function(callback) {
  runSequence(
  [
    'sass-remote',
    'cmd',
    'browsersync-remote',
    'watch'
  ],
  callback);
});*/
