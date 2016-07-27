'use strict';

var path = require('path');
var SRC = path.join(__dirname, 'src/');
var NODE_MODULES = path.join(__dirname, 'node_modules/');

var PROD_MODE = process.env.NODE_ENV === 'production';

var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: './src/scripts/app.js',
  output: {
    path: './dist',
    filename: 'dist.js'
  },

  resolve: {
    root: [SRC, NODE_MODULES],
    alias: {}
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      },
      {
        test: /\.handlebars$/,
        loaders: ['handlebars']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title : 'Tab Gen, Cool++',
      inject : false,
      hash : true,
      template : './src/html/index.handlebars',
      devMode : !PROD_MODE
    })
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
