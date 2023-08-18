const path = require('path');

const getPathForAlias = (p) => path.resolve(__dirname, 'src', p);

module.exports = {
  webpack: {
    alias: {
      '@assets': getPathForAlias('assets'),
      '@components': getPathForAlias('components'),
      '@hooks': getPathForAlias('hooks'),
      '@contexts': getPathForAlias('contexts'),
      '@schemas': getPathForAlias('schemas'),
    }
  },
  style: {
    sass: {
      loaderOptions: {
        implementation: require('sass'),
        webpackImporter: false,
        additionalData: `
          @import './src/components/App/scss/breakpoints.scss';
          @import './src/components/App/scss/colors.scss';
          @import './src/components/App/scss/mixins.scss';
        `,
      },
    },
  },
};
