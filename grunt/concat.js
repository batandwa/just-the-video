module.exports = {
  options: {
    banner: '<%= banner %>',
    stripBanners: true,
  },
  dist: {
    src: ['web/js/**/*.js'],
    dest: 'dist/js/<%= pkg.name %>.js',
  },
};
