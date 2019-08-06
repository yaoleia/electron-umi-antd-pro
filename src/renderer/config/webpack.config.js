const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      issuer: /\.less$/,
      use: [{
        loader: 'js-to-less-loader'
      }]
    }]
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['zh-cn'],
    }),
  ],
};
