'use strict'

let path = require('path')
let webpack = require('webpack')

const PATH = (p) => path.join('..', __dirname, p || '')

module.exports = {
  context: PATH('src'),
  entry: {
    orderly: ['./orderly.js']
  },
  output: {
    filename: 'index.js',
    path: PATH('dist')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      excludes: ['node_modules']
    }, {
      test: /\.json$/,
      loader: "json"
    }]
  }
}
