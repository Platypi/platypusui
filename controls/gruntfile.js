module.exports = exports = function load(grunt) {
    var config = {
        bundle: {
            main: {
                rootModule: 'platui',
                license: './license.txt',
                version: '<%= pkg.version %>',
                src: './app/index.html',
                dest: [
                    '../dist/platypusui.ts'
                ],
                disableLint: true
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: '../'
                }
            }
        },
        less: {
            main: {
                license: './license.txt',
                version: '<%= pkg.version %>',
                src: './app/index.html',
                dest: [
                    '../dist/platypus.less'
                ]
            }
        },
        lessCompile: {
            main: {
                options: {
                    cleancss: true
                },
                files: {
                    '../dist/platypus.min.css': 'controls/lib/platypus.less'
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
                path: 'http://localhost:8080/controls/app/index.html'
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
        watch: {
            ts: {
                files: '**/*.ts',
                tasks: ['typescript']
            },
            less: {
                files: '**/*.less',
                tasks: ['lessCompile']
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        license: grunt.file.read('license.txt')
    };



    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-ts-bundle');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.renameTask('less', 'lessCompile');

    grunt.loadNpmTasks('grunt-less-bundle');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // By default, run all tests.
    grunt.registerTask('default', ['bundle', 'less', 'lessCompile']);
    grunt.registerTask('dev', ['connect', 'open', 'watch']);  
    grunt.registerTask('compile', ['lessCompile', 'typescript']);
};
