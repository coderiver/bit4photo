var gulp   = require('gulp');
var del    = require('del');
var gutil  = require('gulp-util');
var config = require('../config');

gulp.task('clean', function() {
    return del([config.dest.root], function (err, paths) {
        gutil.log('Deleted:', gutil.colors.magenta(paths.join('\n')));
    });
});
