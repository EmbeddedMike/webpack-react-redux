'use strict';
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var os = require('os');
var dns = require('dns');

var devURL;
if (process.env.PROJECT_NAME ) {
  devURL = 'https://' + process.env.PROJECT_NAME + '.gomix.me';
} else {
  devURL = 'http://localhost:3004';
}
var BrowserSyncHotPlugin = require("browser-sync-dev-hot-webpack-plugin");
console.log(BrowserSyncHotPlugin)
const BROWSER_SYNC_OPTIONS = {
    ui: false,
    proxy: {
    target: "http://localhost:3004",
    ws: true
}};
const DEV_MIDDLEWARE_OPTIONS = {
    // publicPath: '/my/public/path'
};
const HOT_MIDDLEWARE_OPTIONS = {};
var devServer = 'webpack-dev-server/client?' + devURL;
module.exports = {
    // devURL: devURL,  //Property no longer allowed
    devtool: 'eval-source-map',
    entry: [
        devServer,
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'app/index.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'app/index.tpl.html',
          inject: 'body',
          filename: 'index.html'
        }),
        // new webpack.optimize.OccurenceOrderPlugin(),
        //No longer needed

        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new BrowserSyncHotPlugin({
            browserSyncOptions: BROWSER_SYNC_OPTIONS,
            devMiddlewareOptions: DEV_MIDDLEWARE_OPTIONS,
            hotMiddlewareOptions: HOT_MIDDLEWARE_OPTIONS,
            callback() {
                console.log('Callback')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    //Schema no longer allows eslint
    // eslint: {
    //     configFile: '.eslintrc',
    //     failOnWarning: false,
    //     failOnError: false
    // },
    module: {
        // preLoaders: [
        //     {
        //         test: /\.js$/,
        //         exclude: /node_modules/,
        //         loader: 'eslint'
        //     }
        // ],
        //Preloaders not allowed
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.json?$/,
                loader: 'json-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass-loader'
            },
            // { test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            // { test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/, loader: 'file' }
        ]
    }
};
