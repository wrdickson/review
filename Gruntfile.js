module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

	requirejs: {
		options: {
			
		},
		compile: {
			options: {
				almond: true,
				baseUrl: "assets/js/",				
				mainConfigFile: "assets/js/require_main.js",
				name: "vendor/almond", // assumes a production build using almond 
				out: "assets/js/build/compiled.js",
				wrapShim: true,
				include: "require_main.js",
				fndNestedDependencies: true
			}
		}
	},
	usebanner: {
			options: {
				position: 'replace',
				replace: true,
				banner: '/*Copyright 2016 William R. Dickson ---<%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> version:<%= pkg.version%> */\n',
				linebreak: true
			},
			files: {
				src: [ 'assets/js/build/compiled.js' ]
			}
	}	
  });

  // Load the plugins that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-banner');
 
  // Default task(s).
  grunt.registerTask('default', ['requirejs','usebanner']);
  
  

};