'use strict'

let path = require('path')
let webpack = require('webpack')

const PATH = (p) => path.resolve(__dirname, '..', p || '')

module.exports = {
  context: PATH('app'),
  entry: {
    index: ['babel-polyfill', './index.js']
  },
  output: {
    filename: 'bundle.js',
    path: PATH('public')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      excludes: ['node_modules']
    }]
  },
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: PATH('public'),
    hot: true,
    inline: true,
    stats: 'error-only'
  }
}
