var gulp = require('gulp');
var gcmq = require('gulp-group-css-media-queries');

gulp.task('gmq', function () {
  gulp.src('./web/min/css/*.css')
    .pipe(gcmq())
    .pipe(gulp.dest('./web/min/css/'));
});