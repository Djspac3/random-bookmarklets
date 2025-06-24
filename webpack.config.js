const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/bootloader.js',
  output: {
    filename: 'bookmarklet.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        type: 'asset/source' // <-- FIXED: use 'type' not 'use'
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/inline'
      }
    ],
  },
  optimization: {
    minimize: true,
  },
  // this is just some nice formating
  plugins: [
    new webpack.BannerPlugin({
      banner: 'javascript:(function(){',
      raw: true,
      entryOnly: true,
    }),
    new webpack.BannerPlugin({
      banner: '})();',
      raw: true,
      footer: true,
      entryOnly: true,
    }),
  ],
};