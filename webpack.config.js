const webpack = require('webpack');
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
        // 输出文件
        filename: 'js/app.js',
        // 指定资源文件引用的目录，会加在资源路径的前面，dev-server模式时需要定义一个，线上时需要定义线上的目录
        publicPath: '/dist/',
        // 输出文件地址
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            page: path.resolve(__dirname, 'src/page'),
            component: path.resolve(__dirname, 'src/component'),
            util: path.resolve(__dirname, 'src/util'),
            service: path.resolve(__dirname, 'src/service')
        }
    },
    module: {
        rules: [
            // js/jsx文件的配置
            {
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // 使用多个处理的时候，会以最右边为最开始执行的loader，然后依次向左执行
                        presets: ['env', 'react']
                    }
                }
            },
            // css文件的配置
            {
                test: /\.css$/,
                // 有顺序之分，首先使用use，然后再使用fallback
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            // scss文件的配置，依赖node-sass和webpack
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            // 图片的配置，url-loader依赖file-loader
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 大于8k的时候就会用原图片，否则使用base64
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            // 字体图标的配置
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 处理html文件的插件
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: './favicon.ico'
        }),
        // 处理提取独立css的插件
        new ExtractTextPlugin('css/[name].css'),
        // 处理提取公共模块的插件，webpack自带，引用次数大于一定次数就会被加入进来
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        })
    ],
    devServer: {
        // 需要配置publicPath，才能正确引用资源文件
        port: 8086,
        // 访问的路径为404时会重定向到这个地址
        historyApiFallback: {
            index: '/dist/index.html'
        }
    }
};