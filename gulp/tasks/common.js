var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');

gulp.task('default', [
    'serve',
    'watch',
    'scripts:watch'
]);

gulp.task('build', function() {
    runSequence(
        'clean',
        'sprite:svg',
        'iconfont',
        'imagemin',
        'sass',
        'jade:all',
        'copy:fonts',
        'scripts:build'
    );
});

gulp.task('copy:fonts', function() {
    gulp.src(config.src.fonts + '/*.{ttf,woff,woff2,eot}')
        .on('error', function(err) {
            config.errorHandler(err);
        })
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('watch', function() {
    gulp.watch(config.src.sass + '/**/*', ['sass']);
    gulp.watch(config.src.jade + '/**/[^_]*.jade', ['jade']);
    gulp.watch(config.src.jade + '/**/_*.jade', ['jade:all']);
    gulp.watch([
        config.src.img + '/**/*',
        '!' + config.src.img + '/icons/**/*'
    ], ['imagemin']);
    gulp.watch(config.src.iconsSvg + '/*.svg', ['sprite:svg']);
    gulp.watch(config.src.iconsPng + '/*.png', ['sprite:png']);
    gulp.watch(config.src.iconsFont + '/*.svg', ['iconfont']);
});
