const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { EsbuildPlugin } = require("esbuild-loader");

/** @type {import('webpack').Configuration} */
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
          loader: "esbuild-loader",
          options: {
            target: "es2015",
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
    minimizer: [
      new EsbuildPlugin({
        target: "es2015",
      }),
    ],
  },
  cache: true,

  resolve: {
    alias: {
      //preact conversion to save bookmarklet size
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat", // Must be below test-utils
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // makes it output a html file with all the data!
      reportFilename: "bundleSizes.html",
      openAnalyzer: false,
    }),
  ],
};
