const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(baseConfig, {

  devServer: {
    port: 9080
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
   
  ]
});