const config = require('./config.js');
const path = require('path');
const webpack = require('webpack');

const lib = {
    "common":'./index.js'
    // "common": [
    //     'jquery',
    //     'jqueryUi',
    //     'bootstrap',
    //     'slimscroll',
    //     'fastclick',
    //     'avalon2',
    //     'mmRouter'
    // ]
};

module.exports = {
    entry: {
        "common_lib": lib.common
    },
    output: {
        path: path.join(__dirname, 'src', 'lib'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            // 'libs': path.resolve(__dirname, 'src'),
            // 'jquery': 'libs/plugins/jQuery/jquery-2.2.3.min.js',
            // 'jqueryUi': 'libs/plugins/jQueryUI/jquery-ui.min.js',
            // 'bootstrap':'libs/plugins/bootstrap/js/bootstrap.min.js',
            // 'slimscroll':'libs/plugins/slimScroll/jquery.slimscroll.js',
            // 'fastclick':'libs/plugins/fastclick/fastclick.js',
            // 'avalon2':'libs/plugins/avalon/avalon.js',
            // 'mmRouter':'libs/plugins/avalon/mmRouter.js'
        }
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "manifest.json"),
            name: '[name]',
            context: __dirname
        })
    ]
};