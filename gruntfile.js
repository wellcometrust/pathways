module.exports = function(grunt) {

    // 0. Load all grunt tasks matching the `grunt-*` pattern from package.json
    require('load-grunt-tasks')(grunt);

    var globalConfig = {};

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        exportRoot: '../export',
        flattenReplacements: ['localhost%3A8888', 'localhost:8888'],
        serverRoot: {
            dhStaging: 'wellcome-pathways.ixomega.com',
            clStaging: 'wellcome-pathways.clearleft.com',
            wellcomelive: 'digitalstories.wellcomecollection.org'
        },
        globalConfig: globalConfig,

        concat: {
            libs: {
                src: [
                    '_assets/js/lib/jquery-2.1.1.min.js',
                    '_assets/js/lib/hammer.min.js',
                    '_assets/js/lib/greensock/TweenMax.min.js',
                    '_assets/js/lib/jquery.scrollmagic.js',
                    '_assets/js/lib/cookies.js',
                    '_assets/js/lib/cookiewarning.js',
                    '_assets/js/lib/d3.min.js',
                    '_assets/js/lib/simple-slider.min.js',

                    '_assets/js/lib/createjs/easeljs-0.7.1.min.js',
                    '_assets/js/lib/createjs/tweenjs-0.5.1.min.js',
                    '_assets/js/lib/createjs/movieclip-0.7.1.min.js',
                    '_assets/js/lib/createjs/preloadjs-0.4.1.min.js',
                ],
                dest: '_assets/build/js/libs.js',
            },
            header: {
                src: [
                    '_assets/js/lib/modernizr-2.8.3.custom.min.js',
                    '_assets/js/pathways/index.js',
                    '_assets/js/pathways/system/index.js',
                    '_assets/js/pathways/scroll/loading-view.js'
                ],
                dest: '_assets/build/js/header.js'
            },
            app_files: {
                src: [
                    '_assets/js/pathways/utils/.js', // Pathways Core files.
                    '_assets/js/pathways/utils/index.js', // Pathways Core files.
                    '_assets/js/pathways/utils/*.js', // Pathways Core files.
                    '_assets/js/pathways/core/index.js', // Pathways Core files.
                    '_assets/js/pathways/core/*.js', // Pathways Core files.
                    '_assets/js/pathways/cookies/index.js', // Pathways Core files.

                    '_assets/js/pathways/media/index.js', // Pathways Core files.
                    '_assets/js/pathways/media/model.js', // Pathways Core files.

                    '_assets/js/pathways/media/vol/index.js', // Pathways Core files.
                    '_assets/js/pathways/media/vol/views/index.js', // Pathways Core files.
                    '_assets/js/pathways/media/vol/views/*.js', // Pathways Core files.

                    '_assets/js/pathways/media/mixer/index.js', // Pathways Core files.

                    '_assets/js/pathways/media/channels/silencer.js', // Pathways Core files.
                    '_assets/js/pathways/media/channels/media-definitions.js', // Pathways Core files.
                    '_assets/js/pathways/media/channels/index.js', // Pathways Core files.
                    '_assets/js/pathways/media/channels/model.js', // Pathways Core files.
                    '_assets/js/pathways/media/channels/ctrl.js', // Pathways Core files.


                    '_assets/js/pathways/media/ctrl.js', // Pathways Core files.
                    '_assets/js/pathways/media/view.js', // Pathways Core files.

                    '_assets/js/pathways/media/video/index.js', // Pathways Core files.

                    '_assets/js/pathways/scroll/index.js', // Main scrollcontrol file.
                    '_assets/js/pathways/scroll/components/*.js', // Scroll components files.

                    '_assets/js/pathways/components/index.js', // Then the patterns
                    '_assets/js/pathways/main.js', // Pathways Core files.

                    '_assets/js/pathways/components/core/index.js', // Then the pattern core files
                    '_assets/js/pathways/components/core/image-loader.js', // Then the pattern core files
                    '_assets/js/pathways/components/core/*.js', // Then the pattern core files
                    '_assets/js/pathways/components/*.js', // Then the patterns
                    '_assets/js/infographics/*.js', // Then any infographics
                    'pathways/**/**/_js/*.js', // And finally the scenes
                    '_assets/js/main.js' // Then the main file.
                ],
                dest: '_assets/build/js/production.js',
            },
            panels: {
                src: ['pathways/**/**/_scss/*.scss'], // The panel specific CSS
                dest: '_assets/scss/panels.scss'
            }
        },

        uglify: {
            options: {
                preserveComments: 'some',
                compress: {
                    drop_console: true
                }
            },
            libs: {
                src: '_assets/build/js/libs.js',
                dest: '_assets/build/js/libs.min.js'
            },
            header: {
                src: '_assets/build/js/header.js',
                dest: '_assets/build/js/header.min.js'
            },
            app_files: {
                src: '_assets/build/js/production.js',
                dest: '_assets/build/js/production.min.js'
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'nested' //'compressed'
                },
                files: {
                    '_assets/build/css/main.css': '_assets/scss/main.scss'
                }
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['_assets/scss/**/*.scss', 'pathways/**/**/_scss/*.scss'],
                tasks: ['css']
            },
            js: {
                files: ['_assets/js/*.js', '_assets/js/core/*.js', '_assets/js/patterns/*.js', 'pathways/**/**/_js/*.js', '_assets/js/lib/*.js', '_assets/js/pathways/**/*.js'],
                tasks: ['js'],
                options: {
                    spawn: false,
                },
            },
            grunt: {
                files: ['gruntfile.js'],
                tasks: ['default']
            }
        },

        php2html: {
            options: {
                docroot: '/',
                htmlhint: {
                    'attr-lowercase': false, // <svg> viewBox incorrectly throws error
                    'tag-pair': false // <source> incorrectly throws error
                },
            },
            pathway: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['index.php', 'pathways/<%= globalConfig.path %>/index.php', 'pathways/<%= globalConfig.path %>/credits.php', 'pathways/<%= globalConfig.path %>/**/index.php'],
                    dest: '<%= exportRoot %>',
                    ext: '.html'
                }],
            }

        },

        copy: {
            default: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['_assets/**', '!_assets/scss/**', '!_assets/js/**', '!_assets/img/**', 'wellcomeplayer/**', 'player-config.js'],
                    dest: '<%= exportRoot %>'
                }]
            }
        },

        replace: {
            dist: {
                overwrite: true,
                src: ['<%= exportRoot %>/pathways/**/*.html'],
                replacements: [{
                    from: 'localhost%3A8888',
                    to: '<%= serverRoot.wellcomelive %>'
                }, {
                    from: 'localhost:8888',
                    to: '<%= serverRoot.wellcomelive %>'
                }]
            }
        },

        imagemin: {
            options: { // Target options
                optimizationLevel: 3,
                svgoPlugins: [{
                    removeViewBox: false
                }, {
                    removeUselessStrokeAndFill: false
                }, {
                    removeEmptyAttrs: false
                }],
                progressive: true
            },
            core: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['_assets/img/**/*.{png,jpg,gif}'],
                    dest: '<%= exportRoot %>'
                }]
            },
            pathway: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['pathways/<%= globalConfig.path %>/**/_assets/**/*.{png,jpg,gif,svg}'],
                    dest: '<%= exportRoot %>'
                }]
            }
        },

        svgmin: {
            options: {
                plugins: [{
                    removeViewBox: false
                }, {
                    removeUselessStrokeAndFill: false
                }, {
                    removeEmptyAttrs: false
                }]
            },
            core: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['_assets/img/**/*.svg'],
                    dest: '<%= exportRoot %>'
                }]
            },
            pathway: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['pathways/<%= globalConfig.path %>/**/_assets/**/*.svg'],
                    dest: '<%= exportRoot %>'
                }]
            }
        }


    });


    // 3. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('css', ['concat', 'sass']);
    grunt.registerTask('js', ['concat', 'uglify']);

    grunt.registerTask('default', ['css', 'js']);

    grunt.registerTask('export', 'Exporting pathways', function(arg) {
        function runPath(path) {
            globalConfig.path = path;
            grunt.task.run(['php2html:pathway', 'copy:default', 'replace', 'imagemin:core', 'imagemin:pathway', 'svgmin:core', 'svgmin:pathway']);
        }
        if (arg) {
            grunt.log.writeln('Exporting ', arg);
            if (arg === 'all') arg = '*';
            runPath(arg);
        } else {
            grunt.log.writeln('Exporting all');
            runPath('*');
        }
    });

};
