module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({
    jshint: {
      files: ['./js/**/*.js'],
      options: {
        predef: ["document", "console", "$", "firebase", "FbAPI", "app", "angular", "Materialize"],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true
      }
    },
    sass: {
      dist: {
        files: {
          './styles/main.css': './sass/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['./js/**/*.js'],
        tasks: ['jshint']
      },
      sassy: {
        files: ['./sass/**/*.scss'],
        tasks: ['sass']
      }
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: "./",
          src: [
            "cohortlogo.png",
            "index.html",
            "fonts/**/*.eot",
            "fonts/**/*.ttf",
            "fonts/**/*.woff",
            "fonts/**/*.woff2",
            "js/**/*.js",
            "styles/**/*.css",
            "partials/**/*.html",
            "node_modules/jquery/dist/jquery.min.js",
            "node_modules/angular/angular.min.js",
            "node_modules/angular-route/angular-route.min.js",
            "bower_components/angular-sanitize/angular-sanitize.min.js ",
            "bower_components/showdown/compressed/Showdown.min.js",
            "bower_components/angular-markdown-directive/markdown.js",
            "bower_components/angular-sanitize/angular-sanitize.min.js",
            "bower_components/showdown/compressed/Showdown.min.js",
            "bower_components/angular-markdown-directive/markdown.js",
          ],
          dest: "./public/"
        }]
      }
    }
  });

  grunt.registerTask('default', ['sass', 'jshint', 'watch']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('deploy', ['sass', 'copy']);
};