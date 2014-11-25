module.exports = function(grunt) {

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

        concat: {
            libs: {
                src: [
                    '_assets/js/lib/jquery-2.1.1.min.js',
                    '_assets/js/lib/hammer.min.js',
                    '_assets/js/lib/greensock/TweenMax.min.js',
                    '_assets/js/lib/jquery.scrollmagic.js',
                    '_assets/js/lib/d3.min.js',
                    '_assets/js/lib/simple-slider.min.js',

                    '_assets/js/lib/createjs/easeljs-0.7.1.min.js',
                    '_assets/js/lib/createjs/tweenjs-0.5.1.min.js',
                    '_assets/js/lib/createjs/movieclip-0.7.1.min.js',
                    '_assets/js/lib/createjs/preloadjs-0.4.1.min.js',
                ],
                dest: '_assets/build/js/libs.js',
            },
            app_files: {
                src: [
                    '_assets/animations/**/*.js', // Any animation files
                    '_assets/js/pathways.js', // The Pathways Core file.
                    '_assets/js/main.js', // Then the main file.
                    '_assets/js/core/*.js', // Then the pattern core files
                    '_assets/js/patterns/*.js', // Then the patterns
                    '_assets/js/infographics/*.js', // Then any infographics
                    'pathways/**/**/_js/*.js' // And finally the scenes
                ],
                dest: '_assets/build/js/production.js',
            },
            panels: {
                src: ['pathways/**/**/_scss/*.scss'], // The panel specific CSS
                dest: '_assets/scss/panels.scss'
            }
        },

        uglify: {
            libs: {
                src: '_assets/build/js/libs.js',
                dest: '_assets/build/js/libs.min.js'
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
                files: ['_assets/js/*.js', '_assets/js/patterns/*.js', 'pathways/**/**/_js/*.js'],
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
            mindcraft: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['pathways/1-mindcraft/index.php', 'pathways/1-mindcraft/credits.php', 'pathways/1-mindcraft/**/index.php'],
                    dest: '<%= exportRoot %>',
                    ext: '.html'
                }],
            },
            collectors: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['pathways/2-the-collectors/index.php', 'pathways/2-the-collectors/credits.php', 'pathways/2-the-collectors/**/index.php'],
                    dest: '<%= exportRoot %>',
                    ext: '.html'
                }],
            },
            all: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['pathways/*/index.php', 'pathways/*/credits.php', 'pathways/*/**/index.php'],
                    dest: '<%= exportRoot %>',
                    ext: '.html'
                }],
            },

        },

        copy: {
            default: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['_assets/**', '!_assets/scss/**', '!_assets/js/**', '_assets/js/lib/modernizr-2.8.3.custom.min.js', 'wellcomeplayer/**', 'player-config.js'],
                    dest: '<%= exportRoot %>'
                }]
            },
            mindcraft: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['pathways/1-mindcraft/_assets/**'],
                    dest: '<%= exportRoot %>'
                }]
            },
            collectors: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['pathways/2-the-collectors/_assets/**'],
                    dest: '<%= exportRoot %>'
                }]
            },
            all: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['pathways/*/_assets/**'],
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
                },
                {
                    from: 'localhost:8888',
                    to: '<%= serverRoot.wellcomelive %>'
                }]
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-php2html');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-text-replace');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('css', ['concat', 'sass']);
    grunt.registerTask('js', ['concat', 'uglify']);

    grunt.registerTask('default', ['css', 'js']);

    grunt.registerTask('export', 'Exporting pathways', function(arg) {
        if (arg) {
            grunt.log.writeln('Exporting ', arg); // TODO - use arg to export specific pathway
            function runPath(name) {
                grunt.task.run(['php2html:' + name, 'copy:default', 'copy:' + name, 'replace']);
            }
            runPath(arg);
        } else {
            grunt.log.writeln('Exporting all');
            grunt.task.run(['php2html:all', 'copy:default', 'copy:all', 'replace']);
        }
    });

};
