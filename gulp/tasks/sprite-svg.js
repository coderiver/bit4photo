var gulp     = require('gulp');
var plumber  = require('gulp-plumber');
var svgmin   = require('gulp-svgmin');
var svgStore = require('gulp-svgstore');
var rename   = require('gulp-rename');
var cheerio  = require('gulp-cheerio');
// var gutil    = require('gulp-util');
// var through2 = require('through2');
var config   = require('../config');

gulp.task('sprite:svg', function() {
    return gulp.src(config.src.iconsSvg + '/*.svg')
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{
                removeDesc: true
            }, {
                cleanupIDs: true
            }, {
                mergePaths: false
            }]
        }))
        .pipe(cheerio({
            run: function($, file) {
                $('[fill]:not([fill="currentColor"])').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(rename({ prefix: 'svg-' }))
        .pipe(svgStore({ inlineSvg: false }))
        // .pipe(through2.obj(function (file, encoding, cb) {
        //     var $ = file.cheerio;
        //     var data = $('svg > symbol').map(function () {
        //         return {
        //             name: $(this).attr('id'),
        //             viewBox: $(this).attr('viewBox')
        //         };
        //     }).get();
        //     var jsonFile = new gutil.File({
        //         path: 'metadata.json',
        //         contents: new Buffer(JSON.stringify(data))
        //     });
        //     this.push(jsonFile);
        //     this.push(file);
        //     cb();
        // }))
        .pipe(rename({ basename: 'sprite' }))
        .pipe(gulp.dest(config.dest.img));
});
