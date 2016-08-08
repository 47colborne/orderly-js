'use strict'

let resolve = require('path').resolve
let webpack = require('webpack')

const PATH = (path) => resolve(__dirname, path || '')

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
      exclude: /(node_modules)/
    }]
  },
  devtool: 'cheap-source-map',
  devServer: {
    hot: true,
    inline: true,
    stats: 'error-only'
  }
}
