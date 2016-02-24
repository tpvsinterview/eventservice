module.exports = function(grunt) {
 
grunt.initConfig({
    sass: {
        options: {
            outputStyle: 'compressed',
            compass: 'true'
        },
        dist: {
          files: {
              'styles/styles.css': 'source/bootstrap-sass-official/assets/stylesheets/application.scss',
          }
        }
    },

    watch: {

        css: {
            files: ['source/bootstrap-sass-official/assets/**/*.scss'],
            tasks: ['sass']
        } 
    }
});

grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default', ['sass']);

};