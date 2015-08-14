var gulp    = require('gulp');
var ghPages = require('gulp-gh-pages');
var gutil   = require('gulp-util');
var config  = require('../config');

gulp.task('deploy', function() {
    if (!config.production) {
        gutil.log(gutil.colors.blue('This task require flag'), gutil.colors.red('--production'));
        return false;
    }
    return gulp
        .src('./dist/**/*.*')
        .pipe(ghPages());
});
