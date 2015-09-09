// Generated on 2015-06-08 using generator-angular 0.10.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'src',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: [
          '<%= yeoman.app %>/app/**/*.js',
          '<%= yeoman.app %>/common/**/*.js',
          '<%= yeoman.app %>/state-components/**/*.js',
          '!<%= yeoman.app %>/app/**/*.spec.js',
          '!<%= yeoman.app %>/common/**/*.spec.js',
          '!<%= yeoman.app %>/state-components/**/*.spec.js'
        ],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: [
          '<%= yeoman.app %>/app/**/*.spec.js',
          '<%= yeoman.app %>/common/**/*.spec.js',
          '<%= yeoman.app %>/state-components/**/*.spec.js'
        ],
        tasks: ['newer:jshint:test']
      },
      compass: {
        files: [
          '<%= yeoman.app %>/app/**/*.{scss,sass}',
          '<%= yeoman.app %>/common/**/*.{scss,sass}',
          '<%= yeoman.app %>/state-components/**/*.{scss,sass}',
          '<%= yeoman.app %>/styles/**/*.{scss,sass}'
        ],
        tasks: ['compass:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/app/**/*.js',
          '<%= yeoman.app %>/common/**/*.js',
          '<%= yeoman.app %>/state-components/**/*.js',
          '!<%= yeoman.app %>/app/**/*.spec.js',
          '!<%= yeoman.app %>/common/**/*.spec.js',
          '!<%= yeoman.app %>/state-components/**/*.spec.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: [
          '<%= yeoman.app %>/app/**/*.spec.js',
          '<%= yeoman.app %>/common/**/*.spec.js',
          '<%= yeoman.app %>/state-components/**/*.spec.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: /\.\.\//
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      },
      // Adds bower components to karma files
      test: {
        src: 'test/karma.conf.js',
        ignorePath: /\.\.\//,
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/',
        cssDir: '.tmp',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>',
        javascriptsDir: '<%= yeoman.app %>',
        fontsDir: '<%= yeoman.app %>/assets/webfonts',
        importPath: './bower_components',
        httpImagesPath: '/assets/images',
        httpGeneratedImagesPath: '/assets/images/generated',
        httpFontsPath: '/assets/webfonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/assets/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/**/*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/assets/icons/as-fonts/**/*.{eot,svg,ttf,woff,woff2}',
          '<%= yeoman.dist %>/assets/webfonts/**/*.{eot,svg,ttf,woff,woff2}'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/assets'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/assets/images',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>/assets/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '**/*.html',
            'assets/icons/as-fonts/**/*',
            'assets/webfonts/**/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/assets/images',
          dest: '<%= yeoman.dist %>/assets/images',
          src: ['generated/*']
        }]
      },
      // styles: {
      //   expand: true,
      //   cwd: '<%= yeoman.app %>/styles',
      //   dest: '.tmp/styles/',
      //   src: '{,*/}*.css'
      // }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    filesize: {
      base: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '**/*.{png,jpg,jpeg,gif,webp,svg}'
        }],
        options: {
          output: [{
            stdout: false,
            path: '<%= yeoman.app %>/common/preloader/preloadable-files.constant.js',
            format: '{filename}#split#{size}#eof#',
            append: false
          }]
        }
      }
    },

    filetransform: {
      options: {
        map: function (contents) {
          var
            files = contents.split('#eof#'),
            fileSplit,
            toReturn = {
              files: {}
            };

          for (var i = 0; i < files.length; i++) {
            fileSplit = files[i].split('#split#');

            // removes the new line and carriage return characters
            fileSplit[0] = fileSplit[0].replace(/\r|\n/gi, '');

            // don't add empty values
            if (fileSplit[0].length > 0) {
              // removes the /src from the path. for some reason, filesize
              // doesn't do this.
              fileSplit[0] = fileSplit[0].replace(/^src\//gi, '');
              // parses the size to number
              fileSplit[1] = parseInt(fileSplit[1]);

              toReturn.files[fileSplit[0]] = fileSplit[1];
            }
          }

          return JSON.stringify(toReturn);
        },
        reduce: function (results) {
          var
            start = '/* jshint ignore:start */\r\n\r\n/* this file is dynamically generated by filetransform */\r\n\r\n(function () {\'use strict\';angular.module(\'common.preloader\').constant(\'PRELOADABLE_FILES\', ',
            end = ');})();\r\n\r\n/* jshint ignore:end */';

          var filesInfo = JSON.parse(results[0].contents);

          var content = JSON.stringify(filesInfo.files);

          return start + content + end;
        }
      },
      files: {
        src: '<%= yeoman.app %>/common/preloader/preloadable-files.constant.js',
        dest: '<%= yeoman.app %>/common/preloader/preloadable-files.constant.js'
      },
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      }
    },

    ngtemplates: {
      app: {
        cwd: '<%= yeoman.app %>',
        src: [
          '**/*.html',
          // Everything except for the main html file is a template which can be 
          // added to templateCache.
          '!index.html'
        ],
        dest: '<%= yeoman.app %>/app/ng-templates/ng-templates.run.js',
        options: {
          bootstrap: function (module, script) {
            var prefix = '';
            prefix += '/* jshint ignore:start */\r\n\r\n/* this file is dynamically generated by ngtemplates */\r\n\r\n';
            prefix += '(function () {\'use strict\';angular.module(\'' + module + '\')';
            prefix += '.run([\'$templateCache\', function($templateCache) {';

            var suffix = ''; 
            suffix += '}]);})();';
            suffix += '\r\n\r\n/* jshint ignore:end */';

            return prefix + script + suffix;
          },
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          },
          module: 'HyperionApp'
        }
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'filesize',
      'filetransform',
      'concurrent:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'connect:test',
    'karma'
  ]);

  // todo Make this work
  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'ngtemplates',
    'useminPrepare',
    'concurrent:dist',
    'concat',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
