// Minimal requirements
var yaml   = require('gulp-yaml');
var gulp   = require('gulp');

// Create JS files from YML files
gulp.task('json_data', function(){
  gulp.src('./app/config/parameters.yml')
    .pipe(yaml({space: 2}))
    .pipe(gulp.dest('./app/gulp/'))
});
