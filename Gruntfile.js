module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            compile: {
                files: {
                    'lib/etsyjs.js': 'src/etsyjs.coffee',
                    'lib/etsyjs/user.js': 'src/etsyjs/user.coffee',
                    'lib/etsyjs/category.js': 'src/etsyjs/category.coffee',
                    'lib/etsyjs/shop.js': 'src/etsyjs/shop.coffee',
                    'lib/etsyjs/search.js': 'src/etsyjs/search.coffee',
                    'lib/etsyjs/client.js': 'src/etsyjs/client.coffee',
                    'lib/etsyjs/auth.js': 'src/etsyjs/auth.coffee',
                    'lib/etsyjs/listing.js': 'src/etsyjs/listing.coffee'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-coffee');

    // Default task(s).
    grunt.registerTask('default', ['coffee']);

};
