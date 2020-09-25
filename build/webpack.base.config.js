const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist/main'),
    filename: '[name].js',
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  resolve: {
    extensions: ['.jsx', '.ts', '.js', '.json'],
  },
  devtool: 'source-map',
};
