module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            coffee: {
                files:['src/**/*.coffee'],
                tasks: ['coffee:compileAll'],
                options: {
                    spawn: false
                }
            }
        },

        coffee: {
            compileAll: {
                expand: true,
                bare: true,
                cwd: 'src',
                src: '**/*.coffee',
                dest: 'lib',
                ext: '.js'
            }
        },

        coffeelint: {
            app: ['src/*.coffee', 'src/etsyjs/*.coffee']
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: 'coffee-script/register'
                },
                src: ['test/**/*.coffee']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-coffeelint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-release');

    // task(s)
    grunt.registerTask('default', ['coffee', 'watch', 'coffeelint', 'mochaTest']);
    grunt.registerTask('test', ['mochaTest']);

};
