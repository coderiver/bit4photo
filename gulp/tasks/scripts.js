var gulp        = require('gulp');
var browserify  = require('browserify');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var gutil       = require('gulp-util');
var sourcemaps  = require('gulp-sourcemaps');
var size        = require('gulp-size');
var gulpif      = require('gulp-if');
var config      = require('../config');

var props = {
    entries: ['./' + config.src.js + '/app.coffee'],
    dest: [config.dest.js],
    transform: ['coffeeify'],
    extensions: ['.js', '.coffee'],
    outputName: 'app.js',
    debug: true,
    cache: {},
    packageCache: {}
};

function bundle(bundler) {
    return bundler
        .bundle()
        .on('error', config.errorHandler)
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(size())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(gulpif(config.production, uglify()))
        .pipe(size())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest.js));
}

gulp.task('scripts', function() {
    var bundler = browserify(props);
    return bundle(bundler);
});

gulp.task('scripts:watch', function() {
    var bundler = watchify(browserify(props));
    bundler.on('log', gutil.log);
    bundler.on('update', function() {
        bundle(bundler);
    });
    return bundle(bundler);
});
