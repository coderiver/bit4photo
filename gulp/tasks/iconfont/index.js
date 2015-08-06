var gulp         = require('gulp');
var iconfont     = require('gulp-iconfont');
var config       = require('../../config');
var consolidate  = require('gulp-consolidate');
var runTimestamp = Math.round(Date.now()/1000);

gulp.task('iconfont', function(){
    return gulp.src([config.src.iconsFont + '/*.svg'])
        .pipe(iconfont({
            fontName: 'iconfont',
            appendUnicode: true,
            formats: ['ttf', 'eot', 'woff', 'woff2'],
            timestamp: runTimestamp,
            normalize: true,
            fontHeight: 1001
        }))
        .on('glyphs', function(glyphs, options) {
            gulp.src('./gulp/tasks/iconfont/_iconfont.scss')
                .pipe(consolidate('lodash', {
                    glyphs: glyphs,
                    fontName: 'iconfont',
                    fontPath: '../fonts/',
                    className: 'if'
                }))
                .pipe(gulp.dest(config.src.sass));
        })
        .pipe(gulp.dest(config.dest.fonts));
});
