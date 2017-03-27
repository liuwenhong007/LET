const config = require('./config.js');
const path = require('path');
const webpack = require('webpack');

module.exports ={
  entry: {index:'./src/pages/index/index.js',
    vendor: config.lib_js.map(function(script){
      return path.resolve('./src'+script);
    }),
  },
  output: {
    path: path.resolve(config.buildPath),
    filename: 'js/index.js',
    publicPath: '/'
  },
  resolve:{

  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      // filename: "vendor.js"
      // (Give the chunk a different name)

      minChunks: Infinity,
      // (with more entries, this ensures that no other module
      //  goes into the vendor chunk)
    })
  ]
};