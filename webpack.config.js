'use strict';

var path = require('path');
var SRC = path.join(__dirname, 'src/');
var NODE_MODULES = path.join(__dirname, 'node_modules/');

var PROD_MODE = process.env.NODE_ENV === 'production';
console.log('PROD_MODE', PROD_MODE);

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: './src/scripts/app.js',
  output: {
    path: './dist',
    filename: 'dist.js'
  },

  resolve: {
    root: [SRC, NODE_MODULES],
    modulesDirectories : [NODE_MODULES],
    alias: {}
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      },
      {
        test: /\.handlebars$/,
        loaders: ['handlebars']
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!less?sourceMap')
      },
      {
        test: /\.(jpg|png)$/,
        loaders: ['file?name=img/[name].[ext]']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title : 'Tab Gen, Cool++',
      inject : false,
      hash : true,
      minify: PROD_MODE && {
        removeComments : true,
        collapseWhitespace : true,
      },
      template : './src/html/index.handlebars'
    }),
    new ExtractTextPlugin('styles.css')
  ],

  preLoaders: [
    {
      test: /\.js$/,
      loaders: ['jshint'],
      // define an include so we check just the files we need
      include: SRC
    }
  ]
};

module.exports = config;
