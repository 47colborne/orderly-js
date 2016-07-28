'use strict'

let path = require('path')
let webpack = require('webpack')

const PATH = (p) => path.resolve(__dirname, '..', p || '')

module.exports = {
  context: PATH('test/integration'),
  entry: {
    index: ['babel-polyfill', './index.js']
  },
  output: {
    filename: 'bundle.js',
    path: PATH('test/integration')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      includes: ['test/integration'],
      excludes: ['node_modules']
    }]
  },
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: PATH('test/integration'),
    hot: true,
    inline: true,
    stats: 'error-only'
  }
}
