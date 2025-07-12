const path = require('path');

module.exports = {
  entry: {
    bookmarklet: './src/manager/bootloader.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        type: 'asset/inline' // <-- FIXED: use 'type' not 'use'
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/inline'
      }
    ],
  },
  optimization: {
    minimize: true,
  }
};