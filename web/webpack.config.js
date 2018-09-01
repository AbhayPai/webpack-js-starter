/*
 * always define variable as const for requiring file
 * variable definition should be camelcase
 * use one space for declaration
 * always use comment which can help other developers
 */
const Path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// the path(s) that should be cleaned
let PathsToClean = [
  './public/js',
];

// the clean options to use
let CleanOptions = {
  exclude:  ['./private/*', './node_modules/*'],
  verbose:  true,
};

// definition of project file compilation
module.exports = {
  // defining entry point for the files
  entry: {
    index: Path.join(__dirname, "./", "private/", "js/", "index.js"),
  },

  // defining output for the files
  output: {
    path: Path.join(__dirname, "./", "public/", "js/"),
    filename: "[name].js"
  },

  // defining rules for the compilation of different sets of file
  module:{
    // rules
    rules: [
      // testing js file
      {
        // defining rules for the js scripts
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
    // rules end
  },

  // defining plugins used to generate the file output
  plugins: [
    // deleting files and folder before generating new ones
    // https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin(
      PathsToClean,
      { CleanOptions }
    ),

    // compressing js files
    // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
    new UglifyJsPlugin({
        uglifyOptions: {
        compress: true,
      }
    }),
  ]
};
