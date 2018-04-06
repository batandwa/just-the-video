module.exports = function(grunt) {
  var path = require('path');

  require('load-grunt-config')(grunt, {
    pkg: grunt.file.readJSON('package.json'),
    // Path to task.js files, defaults to grunt dir
    configPath: path.join(process.cwd(), 'grunt'),

    // Auto grunt.initConfig
    init: true,

    // Data passed into config.  Can use with <%= test %>
    data: {
      pkg: grunt.file.readJSON('package.json'),
      bookmarklet: function() { return grunt.file.read('temp/bookmarklet.txt'); },
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    },

    // Use different function to merge config files
    mergeFunction: require('recursive-merge'),

    // Can optionally pass options to load-grunt-tasks.
    // If you set to false, it will disable auto loading tasks.
    loadGruntTasks: {
      pattern: 'grunt-*',
      config: require('./package.json'),
      scope: 'devDependencies',
    },

    // Can post process config object before it gets passed to grunt
    postProcess: function(config) {},

    // Allows to manipulate the config object before it gets merged with the data object
    preMerge: function(config, data) {}
  });
};
