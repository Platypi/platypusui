var _ = require('lodash');
var path = require('path');

function loadConfig(path, config, grunt) {
    var glob = require('glob'),
        obj = {},
        key;

    if(path[path.length - 1] !== '/') {
        path += '/';
    }

    glob.sync('*', {cwd: path}).forEach(function(option) {
        key = option.replace(/\.js$/,'');
        obj[key] = require(path + option)(config, grunt);
    });

    return obj;
};

var config = {
    license: 'license.txt',
    version: '<%= pkg.version %>',
    name: 'platypusui',
    folders: {
        src: 'src/',
        examples: 'examples/',
        test: 'test/',
        dist: 'dist/'
    },
    build: {
        dest: {
            ts: 'dist/platypusui.ts',
            tslocal: 'dist/platypusui-local.ts',
            dts: 'dist/platypusui.d.ts',
            dtslocal: 'dist/platypusui-local.d.ts',
            js: 'dist/platypusui.js',
            jslocal: 'dist/platypusui-local.js',
            min: 'dist/platypusui.min.js',
            minlocal: 'dist/platypusui-local.min.js',
            less: 'dist/platypus.less',
            css: 'dist/platypus.css',
            mincss: 'dist/platypus.min.css'
        }
    },
    examples: {
        css: 'examples/style.css',
        less: 'examples/style.less'
    }
};

module.exports = function load(grunt) {
    grunt.initConfig(_.extend({
        pkg: grunt.file.readJSON('package.json')
    }, loadConfig('./build/options', config, grunt)));

    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', '!grunt-contrib-less', '!grunt-less-bundle']
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.renameTask('less', 'lessCompile');
    grunt.loadNpmTasks('grunt-less-bundle');

    // By default, run all tests.
    grunt.registerTask('default', [
        'clean:before',
        'bundle',
        'less',
        'lessCompile:main',
        'cssmin',
        'copy:main',
        'copy:local',
        'ts',
        'copy:rmLibs',
        'uglify',
        'copy:typings',
        'copy:typingslocal',
        'copy:fonts',
        'clean:after'
    ]);

    grunt.registerTask('docs', [
        'clean',
        'bundle'
    ]);

    grunt.registerTask('examples', ['lessCompile:examples', 'watch']);
};
