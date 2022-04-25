'use strict';

const HtmlPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack-common.config');
const path = require('path');

module.exports = merge(webpackCommon, {
  mode: 'development',
  entry: {
    demo: './demo/index.jsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist/demo'),
  },

  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    stats: {
      maxModules: 0,
    },
  },

  resolve: {
    alias: {
      // '@tencent/血缘关系图': path.resolve(__dirname, 'src/'),
    },
  },
  plugins: [
    new HtmlPlugin({
      title: '血缘关系图 demo',
      template: './demo/index.html',
    }),
  ],
});
