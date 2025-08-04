const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  entry: {
    manager: "./src/bookmarklet-manager/bootloader.js",
    tools: "./src/tools/bootloader.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "bookmarklets"),
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/i,
        type: "asset/inline",
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: "asset/inline",
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  cache: true,

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // makes it output a html file with all the data!
      reportFilename: "bundleSizes.html",
    }),
  ],
};
