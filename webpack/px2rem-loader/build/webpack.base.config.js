const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    // loader的引入方式
    resolveLoader: {
        // 别名
        // alias: {
        //   'my-px2rem-loader': path.resolve(__dirname, '../loaders/my-px2rem-loader.js'),
        // },
        // 查找的目录
        // modules: ['loaders', 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    // {
                    //   loader: 'px2rem-loader',
                    //   options: {
                    //     remUnit: 75,
                    //     remPrecision: 8
                    //   }
                    // },
                    {
                        loader: path.resolve(__dirname, '../loaders/my-px2rem-loader.js'),
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                            exclude: [/node_modules/, /src\/app/]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './../public')
            }
        ]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './../public/index.html'),
            filename: path.resolve(__dirname, './../dist/index.html'),
            inject: 'body',
            title: 'my-px2rem-loader'
        })
    ]
};
