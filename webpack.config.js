//const path = require('path');
//var webpack = require("webpack");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({template: './src/index.html', filename: 'index.html', inject: 'body'});
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ExtractTextPluginConfig = new ExtractTextPlugin("index_bundle.css");

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + "/build",
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
      }
    ]
  },

  plugins: [
    HtmlWebpackPluginConfig,
    ExtractTextPluginConfig,
    //new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery"})
  ]
};
