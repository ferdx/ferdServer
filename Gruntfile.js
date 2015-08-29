module.exports = function(grunt) {
  
  /**
   * initConfig Sets up the initial configuration for Grunt
   * 
   * @type {Object}
   */
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'server.js', 'ferd.js']
    }
  });
  
  /**
   * loads all the npm tasks
   */
  grunt.loadNpmTasks('grunt-contrib-jshint');

  /**
   * registers all the npm tasts
   */
  grunt.registerTask('default', 'jshint');
  grunt.registerTask('test', 'jshint');
 
};