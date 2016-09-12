module.exports = {
  my_target: {
    options: {
      banner: '<%= banner %>',
      sourceMap: true,
      sourceMapName: 'dist/js/justthevideo.min.js.map',
    },
    files: {
      'dist/js/<%= pkg.name %>.min.js': [
      '<%= concat.dist.dest %>',
      ],
    },
  },
};
