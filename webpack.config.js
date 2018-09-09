/*
* @Author: yongze-chen
* @Date:   2018-06-19 13:26:47
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-09-09 17:30:39
*/
// webpack 是基于node，支持node语法
const path = require('path')

const webpack = require('webpack')

// 导入在内存中生成 HTML 页面的插件
// 只要是插件，都要放到 plugin 节点处

const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.join(__dirname,'./src/main.js'),//入口，表示要使用webpack打包哪个文件
    // 输出文件相关的配置
    output: {
        path: path.join(__dirname,'./dist'),//出口，指定打包好的文件，输出到哪个目录中去
        filename: 'bundle.js'//指定输出的文件名
    },
    plugins: [
        new htmlWebpackPlugin({
            // 创建一个在内存中生成 HTML 页面的插件
            template: path.join(__dirname, './src/index.html'),//指定的模板页面，将来会根据指定页面的路径，去生成内存中的页面
            filename: 'index.html'//指定生成的页面的名称
        })

    ],
    // 这个节点，用于配置所有第三方模块加载器
    module: {
        rules: [//所有第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader','css-loader']},//配置处理css的第三方loader 规则
            { test: /\.scss$/, use: ['style-loader','css-loader','sass-loader']},//配置处理sass的第三方loader 规则
            { test: /\.(jpg|jpeg|gif|bmp|png)$/, use: 'url-loader?limit=2917&name=[hash:8]-[name].[ext]'},
            //配置处理图片路径的第三方loader 规则
            // limit 给定的值 是图片的大小 单位是byte 如果我们引用的图片大于或等于给定的limit值 则不会被转为base64格式的字符串 如果图片小于给定的limit值，则会被转为base64字符串

            { test:/\.(ttf|woff|woff2|svg|eot)$/, use: 'url-loader'},// 处理字体文件
            { test:/\.js$/, use: 'babel-loader', exclude: /node_modules/},
            // 配置Babel 来转换高级的ES语法
        ]
    }
}