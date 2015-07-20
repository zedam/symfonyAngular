var gulp         = require('gulp');
var browsersync  = require('browser-sync');
var config_remote = require('../config').browsersync.development;
var config_local = require('../config').browsersync_local.development;

/**
 * Run the build task and start a server with BrowserSync
 */
gulp.task('browsersync-local', function() {
  browsersync(config_local);
});

gulp.task('browsersync-remote', function() {
  browsersync(config_remote);
});

gulp.task('browsersync-reload', function() {

  console.log('browsersync reload');

  browsersync.reload({
    reloadDelay: 0
  });
});

/*
gulp.task('browser-sync', function() {
  browsersync({
    proxy: {
      target: "http://dev2.dekmantelfestival.com/app_dev.php/",
      middeware: function (req, res, next) {
        console.log(req.url);
        next();
      }
    }
  });
});
*/
