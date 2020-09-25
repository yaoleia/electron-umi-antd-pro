process.env.BABEL_ENV = 'main'
const path = require('path')
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const { dependencies } = require('../package.json')

module.exports = merge(baseConfig, {
  target: 'electron-main',
  externals: [
    ...Object.keys(dependencies || {})
  ],
  entry: {
    main: path.join(__dirname, '../main/main.js'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    }),
  ],
  mode: 'development',
});
