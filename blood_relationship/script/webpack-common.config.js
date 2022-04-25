'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        parser: {
          amd: false,
        },
      },
      {
        test: /\.(t|j)sx?$/,
        loader: 'babel-loader',
        // Regenerate the regex below by running:
        // > npx are-you-es5 check . -rv
        exclude: /[\\/]node_modules[\\/](?!(nanoid)[\\/])/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-typescript'],
        },
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 8kb
              name: 'img/[name].[hash:8].[ext]', // 图片打包的格式
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: { javascriptEnabled: true },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.less'],
  },

  plugins: [new MiniCssExtractPlugin({ filename: '血缘关系图.css' })],

  stats: {
    maxModules: 0,
  },
};
