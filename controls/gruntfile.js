function stripDocs(data) {
    var linkRegex = /\{@link (.*?)[|](.*?)\}/g,
        out = [];

    data.forEach(function (line) {
        line = line.replace(linkRegex, function(value, qualifiedPath, linkValue, index, content) {
            return linkValue;
        });

        if(line.trim() === '*') {
            return;
        } else if (line.indexOf('* @') === -1) {
            out.push(line);
        } else if (line.indexOf('@param') > -1) {
            out.push(line);
        }
    });

    return out;
}

function useStrict(data) {
    var plat;

    data = data
        .map(function (line, index, lines) {
            var trim = line.trim();
            if (trim === '\'use strict\';') {
                return '';
            } else if (trim.indexOf('module platui ') > -1) {
                plat = index + 1;
            }

            return line;
        });

    data.splice(plat, 0, '    \'use strict;\'');
    return data;
}

function normalizeBlockComments(data) {
    return data
        .map(function (line, index, lines) {
            if (line.trim()[0] === '*') {
                return ' ' + line;
            }

            return line;
        })
        .join('\r\n');

}

function addNodeTypeDefinition(data) {
    return data
        .slice(0, -2)
        .concat([
            '',
            'declare module \'platypusui\' {',
            '    export = platui;',
            '}',
            ''
        ]);
}

function getCompileLib() {
	return '/// <reference path="../node_modules/platypus/platypus.d.ts" />\r\n';
}

function prependLib(data) {
	return getCompileLib() + data;
}

function removeLib(data) {
	return data.replace(getCompileLib(), '');
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
                    './platypusui.ts', 
					'dist/platypusui.ts'
                ]
            }
        },
        copy: {
			main: {
                options: {
                    process: function (data) {
                        return prependLib(stripDocs(useStrict(data.split(/\r\n|\n/)))
						.concat(['export = platui;', ''])
						.join('\r\n'));
                    }
                },
                src: './platypusui.ts',
                dest: 'dist/platypusui.ts'
            },
            libs: {
                options: {
                    process: function (data) {
                        return removeLib(data);
                    }
                },
                src: 'dist/platypusui.d.ts',
				dest: 'dist/platypusui.d.ts'
            },
            typings: {
                options: {
                    process: function (data) {
                        data = normalizeBlockComments(data.split(/\r\n|\n/));
                        return addNodeTypeDefinition(data.split(/\r\n|\n/))
                            .join('\r\n');
                    }
                },
                src: 'dist/platypusui.d.ts',
                dest: 'dist/platypusui.d.ts'
            },
			fonts: {
				expand: true,
				cwd: 'controls/icons/fonts/',
                src: ['*'],
                dest: 'dist/fonts/'
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
                files: {
                    'controls/lib/platypus.css': 'controls/lib/platypus.less'
                }
            },
            app: {
                files: {
                    'app/viewcontrols/app.viewcontrol.css': 'app/viewcontrols/app.viewcontrol.less'
                }
            },
            packaging: {
                files: {
					'dist/platypus.css': 'dist/platypus.less'
                }
            }
        },
        cssmin: {
            packaging: {
                options: {
                    keepSpecialComments: 0,
                    restructuring: false,
                    target: 'dist/platypus.min.css'
                },
                files: {
                    'dist/platypus.min.css': [
                        'dist/platypus.css'
                    ]
                }
            }
        },
        open: {
            dev: {
                path: 'http://localhost:8080/app/index.html'
            }
        },
        ts: {
            options: {
                target: 'es5',
                module: 'commonjs',
                sourceMap: true,
                removeComments: false,
                fast: 'always'
            },
            base: {
                src: ['controls/**/*.ts']
            },
            app: {
                src: ['app/**/*.ts']
            },
            packaging: {
                options: {
                    fast: 'never',
                    sourceMap: false,
                    declaration: true
                },
                src: [
                    'dist/platypusui.ts'
                ]
            }
        },
        uglify: {
            main: {
                options: {
                    screwIE8: true
                },
                files: {
                    'dist/platypusui.min.js': [
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
                tasks: ['lessCompile:main', 'lessCompile:app']
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
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.renameTask('less', 'lessCompile');

    grunt.loadNpmTasks('grunt-less-bundle');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // By default, run all tests.
    grunt.registerTask('default', ['clean', 'bundle', 'less', 'lessCompile:packaging', 'cssmin', 'copy:main', 'ts:packaging', 'copy:libs', 'uglify', 'copy:typings', 'copy:fonts', 'clean:after']);
    grunt.registerTask('dev', ['connect', 'open', 'watch']);  
    grunt.registerTask('compile', ['lessCompile:main', 'lessCompile:app', 'ts:base', 'ts:app']);
};
