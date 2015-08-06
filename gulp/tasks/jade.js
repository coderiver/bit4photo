var gulp    = require('gulp');
var jade    = require('gulp-jade');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var filter  = require('gulp-filter');
var config  = require('../config');

// compile only changed jade files
gulp.task('jade', function() {
    return gulp.src(config.src.jade + '/[^_]*.jade')
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(changed(config.dest.html, {
            extension: '.html'
        }))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(config.dest.html));
});

gulp.task('jade:all', function() {
    return gulp.src(config.src.jade + '/[^_]*.jade')
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(config.dest.html));
});
