module.exports = function(grunt) {

	grunt.loadNpmTasks("grunt-ts");
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-text-replace');

    grunt.initConfig({

		ts: {
            kurst: {
                src: ['src/**/*.ts'],
                outDir:'bin/js',
                options: {
                    target: 'es5',
                    sourcemap: false,
                    declaration: false,
                    comments: false,
                    module: 'amd'
                }
            }
		},
	    requirejs: {
		    svg: {
			    options: {

				    baseUrl: "bin/js/",
				    mainConfigFile: "bin/js/config.js",
				    name: "SVGTestStartup",
				    out: "release/js/SVGTest.js",
				    optimize:'none',
				    uglify2: {
					    compress: {
						    sequences: true
					    },
					    warnings: false,
					    mangle: true
				    }
			    }
		    },
		    svgFFTTest: {
			    options: {

				    baseUrl: "bin/js/",
				    mainConfigFile: "bin/js/config.js",
				    name: "SVGFFTTestStartup",
				    out: "release/js/SVGFFTTest.js",
				    optimize:'none',
				    uglify2: {
					    compress: {
						    sequences: true
					    },
					    warnings: false,
					    mangle: true
				    }
			    }
		    },
		    svgLoadersTest: {
			    options: {

				    baseUrl: "bin/js/",
				    mainConfigFile: "bin/js/config.js",
				    name: "SVGLoadersTestStartup",
				    out: "release/js/SVGLoadersTest.js",
				    optimize:'none',
				    uglify2: {
					    compress: {
						    sequences: true
					    },
					    warnings: false,
					    mangle: true
				    }
			    }
		    }
	    },
	    replace: {
		    removeextend: {
			    src: ['bin/js/kurst/**/*.js','bin/js/tests/**/*.js'],
			    overwrite: true,                 // overwrite matched source files
			    replacements: [{
				    from: /var __extends[\W\S\D]*__\(\);\s};/g,
				    to: ""
			    }]
		    }
	    },
	    copy: {
		    release: {
			    files: [
				    {src: ['bin/js/bower_components/requirejs/require.js'], dest: 'release/js/bower_components/requirejs/require.js'},
				    {src: ['bin/js/vendor/typescript.js'], dest: 'release/js/vendor/typescript.js'},
				    {expand: true, cwd: 'bin/css/', src: ['**'], dest: 'release/css/', filter: 'isFile'},
				    {expand: true, cwd: 'bin/assets/', src: ['**'], dest: 'release/assets/', filter: 'isFile'}
			    ]
		    }
	    },
		watch: {
			main: {
				files: ['**/*.ts'],
				tasks: ['ts:kurst' ,'replace:removeextend' ],
				options: {
					spawn: false
				}
			}
		}
    });

	grunt.registerTask('default', 		[ 'ts:kurst' , 'replace:removeextend']);
	grunt.registerTask('watch-main', 	[ 'watch:main' ]);
	grunt.registerTask('release', 	    [ 'ts:kurst' , 'replace:removeextend' , 'requirejs' , 'copy:release']);



};