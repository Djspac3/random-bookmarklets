const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  entry: {
    manager: "./src/bookmarklet-manager/main.jsx",
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
        // compiling shit with babel
        test: /\.(j|t)sx?$/,
        //. then J or T then S for both then X optionaly
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            targets: "defaults",
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        // due to issues with timing of it getting added
        test: /\.css$/i,
        type: "asset/inline",
      },
      {
        // images
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
      openAnalyzer: false,
    }),
  ],
};
