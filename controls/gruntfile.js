module.exports = exports = function load(grunt) {
    var config = {
        bundle: {
            main: {
                rootModule: 'platui',
                license: './license.txt',
                version: '<%= pkg.version %>',
                src: './app/index.html',
                dest: [
                    './platypusui.ts'
                ],
                disableLint: true
            }
        },
        less: {
            main: {
                license: './license.txt',
                version: '<%= pkg.version %>',
                src: './app/index.html',
                ignore: [
                    './controls/less/variables.less'
                ],
                dest: [
                    './platypus.less'
                ]
            }
        },
        pkg: grunt.file.readJSON('package.json')
    };
    
    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-ts-bundle');
    grunt.loadNpmTasks('grunt-less-bundle');
    // By default, run all tests.
    grunt.registerTask('default', ['bundle', 'less']);
};
