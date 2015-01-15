function stripDocs(data) {
    var linkRegex = /\{@link (.*?)[|](.*?)\}/g;

    data = data.replace(linkRegex, function(value, qualifiedPath, linkValue, index, content) {
        return linkValue;
    });

    var lines = data.split(/\r\n|\n/g),
        out = [];

    lines.forEach(function (line) {       
        if(line.trim() === '*') {
            return;
        } else if (line.indexOf('* @') === -1) {
            out.push(line);
        } else if (line.indexOf('@param') > -1) {
            out.push(line);
        }
    });

    return out.join('\r\n');
}

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
        clean: {
            before: {
                force: true,
                src: [
                    'dist/'
                ]
            },
            after: {
                force: true,
                src: [
                    './platypusui.ts', './platypusui.js', './platypusui.d.ts', './platypusui.js.map'
                ]
            }
        },
        copy: {
			setup: {
                options: {
                    process: function (data) {
                        return '/// <reference path="./node_modules/platypus/platypus-node.d.ts" />\r\n' +
						'/// <reference path="./node_modules/.bin/typings/node/node.d.ts" />\r\n' +
						'var plat = require(\'platypus\');\r\n\r\n' + 
						stripDocs(data) + 
						'\r\nexport = platui;\r\n';
                    }
                },
                src: './platypusui.ts',
                dest: './platypusui.ts'
            },
            main: {
                src: ['./platypusui.ts', './platypusui.js', './platypusui.d.ts', './platypusui.js.map'],
                dest: 'dist/'
            },
            bower: {
                options: {
                    process: function (data) {
                        return data
                            .split(/\r\n|\n/)
                            .map(function (line, index, lines) {
                                if (line.trim()[0] === '*') {
                                    return ' ' + line;
                                }

                                return line;
                            }).join('\r\n');
                    }
                },
                src: 'dist/platypusui.d.ts',
                dest: 'dist/platypusui.d.ts'
            }, 
            node: {
                options: {
                    process: function (data) {
                        return data
                            .split(/\r\n|\n/)
                            .slice(0, -2)
                            .concat([
                                '',
                                'declare module \'platypusui\' {',
                                '    export = platui;',
                                '}',
                                ''
                            ])
                            .join('\r\n');
                    }
                },
                src: 'dist/platypusui.d.ts',
                dest: 'dist/platypusui-node.d.ts'
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
                license: './license.txt',
                version: '<%= pkg.version %>',
                src: './app/index.html',
                dest: [
                    'dist/platypus.less'
                ]
            }
        },
        lessCompile: {
            main: {
                options: {
                    cleancss: true
                },
                files: {
                    'controls/lib/platypus.min.css': 'controls/lib/platypus.less'
                }
            },
            app: {
                files: {
                    'app/viewcontrols/app.viewcontrol.css': 'app/viewcontrols/app.viewcontrol.less'
                }
            },
	     packaging: {
                options: {
                    cleancss: true
                },
                files: {
					'dist/platypus.min.css': 'dist/platypus.less'
                }
	    }
        },
        open: {
            dev: {
                path: 'http://localhost:8080/app/index.html'
            }
        },
        ts: {
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
            },
            packaging: {
                options: {
                    target: 'es5',
                    module: 'commonjs',
                    fast: 'never',
                    sourceMap: true,
                    declaration: true,
                    removeComments: false
                },
                src: [
                    './platypusui.ts'
                ]
            }
        },
        uglify: {
            main: {
                options: {
                    sourceMapIn: 'dist/platypusui.js.map',
                    sourceMap: 'dist/platypusui.js.map',
                    screwIE8: true
                },
                files: {
                    'dist/platypusui.js': [
                        'dist/platypusui.js'
                    ]
                }
            }
        },
        watch: {
            ts: {
                files: '**/*.ts',
                tasks: ['ts:base', 'ts:app']
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
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ts-bundle');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.renameTask('less', 'lessCompile');

    grunt.loadNpmTasks('grunt-less-bundle');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // By default, run all tests.
    grunt.registerTask('default', ['clean', 'bundle', 'less', 'lessCompile:packaging', 'copy:setup', 'ts:packaging', 'copy:main', 'uglify', 'copy:bower', 'copy:node', 'clean:after']);
    // grunt.registerTask('default', ['bundle', 'less']);
    grunt.registerTask('dev', ['connect', 'open', 'watch']);  
    grunt.registerTask('compile', ['lessCompile', 'ts:base', 'ts:app']);
};
