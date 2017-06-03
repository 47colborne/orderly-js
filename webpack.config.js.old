'use strict'

let path = require('path')
let webpack = require('webpack')

const PATH = (p) => path.join(__dirname, p || '')

const CONFIG = {
  context: PATH('src'),
  entry: {
    orderly: ['./index.js']
  },
  output: {
    filename: 'index.js',
    path: PATH('dist'),
    library: 'Orderly',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      includes: ['src'],
      excludes: ['node_modules']
    }, {
      test: /\.css$/,
      loaders: ['style', 'css']
    }]
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ["node_modules"]
  }
}

if (process.env.NODE_ENV === 'compile') {
  CONFIG.plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: { warnings: false },
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      }
    })
  ]
}

module.exports = CONFIG
