'use strict';
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const CleanPlugin = require('clean-webpack-plugin');
//const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = require('./config.js');
const DEBUG = process.env.NODE_ENV == 'prod';

var commonCssHtml = '';
var commonJsHtml = '';
var rootJsHtml = '';
var hackJsHtml = '';

if (DEBUG) {
    config.lib_css.forEach(function (style) {
        commonCssHtml += '<link href="' + style + '" rel="stylesheet"/>';
    });
    /*config.hack_js.forEach(function (script) {
     commonJsHtml += '<script src="' + script + '"></script>';
     });
     config.lib_js.forEach(function (script) {
     commonJsHtml += '<script src="' + script + '"></script>';
     });
     commonJsHtml += '<script src="' + config.config_file.src + '/' + config.config_file.srcName + '"></script>';
     config.hack_ie_low_js.forEach(function (script) {
     hackJsHtml += '<script src="' + script + '"></script>';
     });
     config.root_copy_set.forEach(function (obj) {
     rootJsHtml += '<script>' + fs.readFileSync(obj.src, "utf8") + '</script>';
     })*/
} else {
    commonCssHtml = '<link href="' + config.publicPath + 'lib/' + config.file_name + '.css" rel="stylesheet"/>';
    /*  commonJsHtml = '<script src="' + config.publicPath + 'lib/' + config.hack_file_name + '"></script>'
     commonJsHtml += '<script src="' + config.publicPath + 'lib/' + config.file_name + '.js"></script>';
     commonJsHtml += '<script src="' + config.config_file.target + '/' + config.config_file.targetName + '"></script>';
     hackJsHtml += '<script src="' + config.publicPath + 'lib/' + config.hack_ie_low_file_name + '"></script>'
     config.root_copy_set.forEach(function (obj) {
     rootJsHtml += '<script src="' + obj.target + obj.src.substring(obj.src.lastIndexOf('/'), obj.src.length) + '"></script>';
     })*/
}

module.exports = {
    entry: config.enter,
    output: {
        path: path.resolve(config.buildPath),
        filename: 'js/[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            /*{
             test: /\.css$/,
             loader: ExtractTextPlugin.extract({
             fallback: 'style-loader',
             use: 'css-loader'
             })
             },
             {
             test: /\.scss$/,
             loader: ExtractTextPlugin.extract({
             fallback: 'style-loader',
             use: 'css-loader'
             })
             },*/
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    use: "css-loader?" + (DEBUG ? "" : "minimize") + "!autoprefixer-loader!less-loader"
                }),
                //publicPath: "/dist"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[hash].[ext]'
                }
            },
            {
                test: /\.tpl$/,
                loader: 'raw-loader'
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            'node_modules'
        ],
        extensions: ['.js', '.json', '.less', '.scss'],
        alias: {}
    },
    externals: {
        'jquery': 'window.$',
        'lodash': 'window._'
    },
    devtool: '',
    plugins: [
        /*new BrowserSyncPlugin({
         // browse to http://localhost:3000/ during development,
         // ./public directory is being served
         host: 'localhost',
         port: 3000,
         proxy: 'localhost:8765'
         }),*/
        new CleanPlugin(['*'], {
            root: path.resolve('./dist')
        }),
        new ExtractTextPlugin({filename: "css/[name].css", allChunks: true}),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "_": "lodash"
        }),
        new CommonsChunkPlugin({
            name: "common",
            filename: 'js/common.js',
            minChunks: 3
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/tpl/index.ejs',
            commonCss: commonCssHtml,
            hash: true,
            chunks: [
                'common', 'index'
            ]
        }),
        new TransferWebpackPlugin([
            {from: './src/common/css/img', to: './img'}
        ])
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: true,
        //     compress: {
        //         warnings: false
        //     },
        //     comments: false
        // }),
        //生成编译之后的文件映射
        /*function () {
         this.plugin('done', function(stats){
         require('fs').writeFileSync(path.join(config.mapPath, "map.json"), JSON.stringify(stats.toJson().assetsByChunkName, null, 4));
         })
         }*/
    ],
    devServer: {
        contentBase: path.join(__dirname, './src'),
        publicPath: '/',
        host: "0.0.0.0",
        compress: true,
        port: 3000,
        hot: true
    }
};