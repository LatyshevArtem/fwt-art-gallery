const path = require('path');

const getPathForAlias = (p) => path.resolve(__dirname, 'src', p);

module.exports = {
  webpack: {
    alias: {
      '@api': getPathForAlias('api'),
      '@assets': getPathForAlias('assets'),
      '@components': getPathForAlias('components'),
      '@consts': getPathForAlias('consts'),
      '@contexts': getPathForAlias('contexts'),
      '@hooks': getPathForAlias('hooks'),
      '@providers': getPathForAlias('providers'),
      '@routes': getPathForAlias('routes'),
      '@schemas': getPathForAlias('schemas'),
      '@store': getPathForAlias('store'),
      '@utils': getPathForAlias('utils'),
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
