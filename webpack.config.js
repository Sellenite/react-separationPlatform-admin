const path = require('path');
/** 
 * 由于使用import加载样式时，css文件是通过js代码生成的，这就导致js在加载完成前样式会有一段白屏时间
 * 为了解决这个问题，使用ExtractTextPlugin插件抽取独立的css样式，在style中引入
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");
/**
 * 用于使用定义html的编译模板，多页面编译的时候会使用它
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'js/app.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: './favicon.ico'
        }),
        new ExtractTextPlugin('css/style.css')
    ],
    devServer: {
        port: 8086,
        historyApiFallback: {
            index: '/dist/index.html'
        }
    }
};