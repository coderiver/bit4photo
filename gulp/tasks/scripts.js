var gulp        = require('gulp');
var browserify  = require('browserify');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var gutil       = require('gulp-util');
var sourcemaps  = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var size        = require('gulp-size');
var gulpif      = require('gulp-if');
var config      = require('../config');

var props = {
    entries: ['./' + config.src.js + '/main.coffee'],
    dest: [config.dest.js],
    extensions: ['.js', '.coffee'],
    outputName: 'main.js',
    debug: true,
    cache: {},
    packageCache: {}
};

gulp.task('scripts:watch', function() {
    var b = watchify(browserify(props));

    function bundle() {
        return b.bundle()
            .on('error', config.errorHandler)
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: true
            }))
            .pipe(gulpif(config.production, uglify()))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.dest.js))
            .pipe(browserSync.reload({
                stream: true,
                once: true
            }));
    }

    b.on('update', bundle);
    b.on('log', gutil.log);

    return bundle();
});

gulp.task('scripts:build', function() {
    return browserify(props)
        .bundle()
        .on('error', config.errorHandler)
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(size())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulpif(config.production, uglify()))
        .pipe(size())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest.js))
});
