const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin

module.exports = merge(baseConfig, {
  // 出口
  output: {
    filename: "[name].[chunkhash].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new CleanWebpackPlugin(),
  ]
});