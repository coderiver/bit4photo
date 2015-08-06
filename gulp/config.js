var argv = require('yargs').argv;

var destPath = argv.production ? 'dist' : '.tmp'

module.exports = {
    // enviropment
    production: argv.production ? true : false,
    development: argv.production ? false : true,

    // paths
    src: {
        root: 'app',
        jade: 'app/jade',
        sass: 'app/sass',
        js: 'app/js',
        img: 'app/img',
        svg: 'app/img/svg',
        icons: 'app/img/icons',
        iconsPng: 'app/img/icons/png',
        iconsSvg: 'app/img/icons/svg',
        iconsFont: 'app/img/icons/iconfont',
        fonts: 'app/fonts'
    },

    dest: {
        root: destPath,
        html: destPath,
        css: destPath + '/css',
        js: destPath + '/js',
        img: destPath + '/img',
        fonts: destPath + '/fonts'
    },

    // for BrowserSync. Enable preview of site via http://mysite.localtunnel.me
    tunnelName: argv.tunnel || null,
    openBrowser: argv.open ? true : false,

    // misc
    errorHandler: require('./util/handle-errors'),
    argv: argv

};
