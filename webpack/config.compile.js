'use strict'

let path = require('path')
let webpack = require('webpack')

const PATH = (p) => path.join(__dirname, '..', p || '')

module.exports = {
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
    }]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  ]
}
