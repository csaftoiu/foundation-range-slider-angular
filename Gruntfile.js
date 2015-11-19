// Generated on 2015-11-17 using generator-angular 0.12.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn'
  });

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist',
    demosite: 'demosite'
  };

  var servePort = grunt.option('port') || 9000;
  var watchPort = (25705 + servePort) % 65536 + 1024;

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
        files: ['<%= yeoman.app %>/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/**/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer:server']
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
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: servePort,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: watchPort
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
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
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
      demosite: {
        options: {
          open: true,
          base: '<%= yeoman.demosite %>'
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
          '<%= yeoman.app %>/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: 'dist',
      demosite: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.demosite %>/{,*/}*',
            '!<%= yeoman.demosite %>/.git{,*/}*'
          ]
        }]
      },
      docs: 'demosite/docs',
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      demosite: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      demosite: {
        options: {
          generatedImagesDir: '<%= yeoman.demosite %>/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      demosite: {
        src: [
          '<%= yeoman.demosite %>/**/*.js',
          '<%= yeoman.demosite %>/styles/{,*/}*.css',
          '<%= yeoman.demosite %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.demosite %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.demosite %>',
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
      html: ['<%= yeoman.demosite %>/**/*.html'],
      css: ['<%= yeoman.demosite %>/styles/{,*/}*.css'],
      js: ['<%= yeoman.demosite %>/**/*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.demosite %>',
          '<%= yeoman.demosite %>/images',
          '<%= yeoman.demosite %>/styles'
        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

    imagemin: {
      demosite: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.demosite %>/images'
        }]
      }
    },

    svgmin: {
      demosite: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.demosite %>/images'
        }]
      }
    },

    htmlmin: {
      demosite: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.demosite %>',
          src: ['*.html'],
          dest: '<%= yeoman.demosite %>'
        }]
      }
    },

    ngtemplates: {
      demosite: {
        options: {
          module: 'foundation-range-slider-angular',
          htmlmin: '<%= htmlmin.demosite.options %>',
          usemin: 'scripts/demo.js'
        },
        cwd: '<%= yeoman.app %>',
        src: 'modules/**/*.html',
        dest: '.tmp/templateCache.js'
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      demosite: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      demosite: {
        html: ['<%= yeoman.demosite %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      demosite: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.demosite %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.demosite %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      dist: {
        // copy main & minified module file
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/modules/foundation-range-slider-angular',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.js'
          ]
        }, {
          // copy the minified module script from the demo site
          expand: true,
          cwd: '<%= yeoman.demosite %>/scripts/',
          dest: '<%= yeoman.dist %>',
          src: ['module*.js'],
          rename: function (dest, src) {
            return dest + '/' + 'foundation-range-slider-angular.min.js';
          }
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      demosite: [
        'compass:demosite',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    // Documentation generation, place documentation into the demosite
    ngdocs: {
      options: {
        dest: 'demosite/docs',
        title: "Foundation Range-Slider Angular Docs",
        startPage: '/api/foundation-range-slider-angular.directive:range-slider'
      },
      api: {
        src: ['app/modules/foundation-range-slider-angular/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-ngdocs');

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'demosite') {
      return grunt.task.run(['build', 'connect:demosite:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer:server',
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
    'wiredep',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:demosite',
    'wiredep',
    'useminPrepare',
    'concurrent:demosite',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:demosite',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin',
    'clean:dist',
    'copy:dist'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    //'test',
    'build',
    'clean:docs',
    'ngdocs'
  ]);
};
