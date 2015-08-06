var gulp        = require('gulp');
var browserSync = require('browser-sync');
var config      = require('../config');

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: [config.dest.root, config.src.root],
            directory: false
        },
        files: [
            config.dest.html + '/*.html',
            config.dest.css + '/*.css',
            config.dest.js + '/*.js',
            config.dest.img + '/**/*'
        ],
        port: 8080,
        logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
        logConnections: false,
        logFileChanges: true,
        open: config.openBrowser ? true : false,
        notify: false,
        ghostMode: false,
        online: config.tunnelName ? true : false,
        tunnel: config.tunnelName ? config.tunnelName : null
    });
});
