var argv = require('yargs').argv;

var destPath = argv.production ? 'dist' : '.tmp';

module.exports = {
    // enviropment (by default development)
    production: argv.production ? true : false,

    // paths
    src: {
        root: 'app',
        jade: 'app/jade',
        sass: 'app/sass',
        sassGen: 'app/sass/generated', // path for sass files that will be generated automatically via some of tasks
        js: 'app/js',
        img: 'app/img',
        svg: 'app/img/svg',
        icons: 'app/img/icons',
        iconsPng: 'app/img/icons/png', // path to png sources for sprite:png task
        iconsSvg: 'app/img/icons/svg', // path to svg sources for sprite:svg task
        iconsFont: 'app/img/icons/iconfont', // path to svg sources for iconfont task
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

    // for BrowserSync. Enable preview of site via http://tunnelName.localtunnel.me
    tunnelName: argv.tunnel || null,
    openBrowser: argv.open ? true : false,

    // misc
    errorHandler: require('./util/handle-errors'),
    argv: argv
};
