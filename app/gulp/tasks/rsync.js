var gulp   = require('gulp');
var gutil = require('gulp-util');
var rsync  = require('gulp-rsync');
var runSequence  = require('run-sequence');
var config = require('../config').ftp;
var ftp = require( 'vinyl-ftp' );


/**
 * Copy files and folder to server
 * via rsync
 */
gulp.task('js-rsync', function(callback) {
  console.log('js rsync started!');

  runSequence(
    [
      'js-rsync-creation'
    ],
    callback);

});

gulp.task('css-rsync', function(callback) {
  console.log('css rsync started!');

  runSequence(
    [
      'css-rsync-creation'
    ],
    callback);

});

gulp.task( 'js-rsync-creation', function() {

  var conn = ftp.create( {
    host: config.host,
    user: config.user,
    password: config.password,
    parallel: config.parallel,
    log: gutil.log
  } );

  var globs =  'web/min/js/app.min.js';

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src( globs, { base: '.', buffer: false } )
    .pipe( conn.newerOrDifferentSize( config.path ) ) // only upload newer files
    .pipe( conn.dest( config.path ) );

});


gulp.task( 'css-rsync-creation', function() {

  var conn = ftp.create( {
    host: config.host,
    user: config.user,
    password: config.password,
    parallel: config.parallel,
    log: gutil.log
  } );

  var globs =  'web/min/css/*.css';

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src( globs, { base: '.', buffer: false } )
    .pipe( conn.newerOrDifferentSize( config.path ) ) // only upload newer files
    .pipe( conn.dest( config.path ) );

});
