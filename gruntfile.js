module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    '_assets/js/*.js', // All JS in the libs folder
                ],
                dest: '_assets/build/js/production.js',
            },
            panels: {
                src:    [ '_assets/scss/panels/**/*.scss' ],
                dest:   '_assets/scss/panels/all.scss'
            }
        },

        uglify: {
            build: {
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
                files: ['_assets/scss/**/*.scss'],
                tasks: ['css']
            },
            // js: {
            //     files: ['_assets/js/*.js'],
            //     tasks: ['js'],
            //     options: {
            //         spawn: false,
            //     },
            // },
            grunt: {
                files: ['gruntfile.js'],
                tasks: ['default']
            } 
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('css', ['concat', 'sass']);
    // grunt.registerTask('js', ['concat', 'uglify']);

    grunt.registerTask('default', ['css']);

};