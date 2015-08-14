var gulp   = require('gulp');
var config = require('../config.js');

gulp.task('copy:fonts', function() {
    return gulp
        .src(config.src.fonts + '/**/*.{ttf,eot,woff,woff2}')
        .pipe(gulp.dest(config.dest.fonts));
});
