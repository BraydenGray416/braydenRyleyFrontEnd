module.exports = function(grunt) {
  grunt.initConfig({
      jshint: {
          files: ['js/*.js', 'js/!*.min.js'],
          options: {
              esversion: 6
          }
      },
      watch: {
        js: {
          files: ['js/*.js', '!js/*.min.js'],
          tasks: ['jshint', 'uglify']
        },
        css: {
          files: ['css/*.css', '!css/*.min.css'],
          tasks: ['csslint', 'cssmin']
        }
      },
      csslint: {
        strict: {
          options: {
            import: 1
          },
          src: ['css/*.css', '!css/*.min.css']
        }
      },
      cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['*.css', '!*.min.css'],
          dest: 'css/',
          ext: '.min.css'
        }]
      }
    },
    uglify: {
      my_target: {
        files: {
          'js/script.min.js': ['js/script.js']
        }
      }
    }
  });



  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('runWatch', ['watch']);
  grunt.registerTask('check', ['jshint', 'csslint']);
  grunt.registerTask('minify', ['cssmin', 'uglify']);
};
