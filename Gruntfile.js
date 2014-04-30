module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    inline: {
      options: {
        tag: '',
        cssmin: true
      },
      all: {
        src: 'document.html'
      }
    },

    markdown: {
      all: {
        options: {
          template: 'template.jst'
        },
        files: [
          {
            expand: true,
            src: '*.md',
            dest: '.',
            ext: '.html'
          }
        ]
      }
    },

    exec: {
      wkhtmltopdf: 'wkhtmltopdf document.html document.pdf'
    },

    watch: {
      all: {
        files: ['*.md', '*.jst'],
        tasks: ['build']
      },

      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: '*.html'
      }
    },

    connect: {

      options: {
        port: 9001,
        livereload: 35732,
        hostname: '0.0.0.0'
      },

      livereload: {
        options: {
          open: 'http://localhost:<%= connect.options.port %>/document.html',
          base: ['.']
        }
      }
    },

    clean: ['node_modules', 'bower_components']
  });

  grunt.registerTask('build', [
    'markdown',
    'inline',
    'exec:wkhtmltopdf'
  ]);
  grunt.registerTask('default', [
    'build',
    'connect:livereload',
    'watch'
  ]);
};
