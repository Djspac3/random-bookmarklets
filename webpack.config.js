const path = require('path');

module.exports = {
  entry: {
    manager: './src/manager/bootloader.js',
    tools: './src/tools/bootloader.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'bookmarklets'),
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