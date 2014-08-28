module.exports = exports = function load(grunt) {
    var config = {
        bundle: {
            main: {
                rootModule: 'platui',
                license: './license.txt',
                version: '<%= pkg.version %>',
                src: './app/index.html',
                dest: [
                    './dist/platypusui.ts'
                ],
                disableLint: true
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './'
                }
            }
        },
        less: {
            main: {
                options: {
                    cleancss: true
                },
                files: {
                    'dist/platypus.min.css': 'dist/platypus.less'
                }
            },
            app: {
                files: {
                    'app/viewcontrols/app.viewcontrol.css': 'app/viewcontrols/app.viewcontrol.less'
                }
            }
        },
        open: {
            dev: {
                path: 'http://localhost:8080/app/index.html'
            }
        },
        typescript: {
            base: {
                src: ['controls/**/*.ts'],
                options: {
                    target: 'ES5',
                }
            },
            app: {
                src: ['app/**/*.ts'],
                options: {
                    target: 'ES5'
                }
            }
        },
        usebanner: {
            main: {
                options: {
                    banner: '/* PlatypusUI v<%= pkg.version %> (http://getplatypi.com)' +
                    '\n<%= license %> */'
                },
                files: {
                    src: ['dist/platypus.min.css']
                }
            }

        },
        watch: {
            ts: {
                files: '**/*.ts',
                tasks: ['typescript']
            },
            less: {
                files: '**/*.less',
                tasks: ['less']
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        license: grunt.file.read('license.txt')
    };



    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-ts-bundle');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-less');
    
    // grunt.loadNpmTasks('grunt-less-bundle');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-banner');
    
    // By default, run all tests.
    grunt.registerTask('default', ['bundle', 'less','usebanner']);
    grunt.registerTask('dev', ['connect', 'open', 'watch']);  
    grunt.registerTask('compile', ['less', 'typescript']);
};
