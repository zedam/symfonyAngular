var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('assets', function (cb) {
    exec('app/console bravoure:assets:increase-version --env=prod --ansi', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});
