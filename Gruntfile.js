module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            compile: {
                files: {
                    'lib/etsyjs.js': 'src/etsyjs.coffee',
                    'lib/etsyjs/user.js': 'src/etsyjs/user.coffee',
                    'lib/etsyjs/client.js': 'src/etsyjs/client.coffee'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-coffee');

    // Default task(s).
    grunt.registerTask('default', ['coffee']);

};
