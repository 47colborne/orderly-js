// ====================================
// Import Dependencies
// ====================================
const { join } = require("path")
const webpack = require("webpack")

const Path = (...path) => {
  return join(__dirname, ...path)
}

// ====================================
// Configuration
// ====================================

module.exports = function(env) {

  // ====================================
  // Common Configuration
  // ====================================
  let config = {
    context: Path("src"),
    entry: {
      orderly: ["./index.js"]
    },
    output: {
      filename: "index.js",
      path: Path("dist"),
      library: "Orderly",
      libraryTarget: "var"
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: [{
          loader: "babel-loader",
        }],
        exclude: /node_modules/
      }]
    },
    devtool: "cheap-module-source-map",
    resolve: {
      extensions: [".js"],
      modules: [Path("src"), "node_modules"]
    }
  }

  // ====================================
  // Production Configuration
  // ====================================

  if (env == "production") {
    config.plugins = [
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: {
          warnings: false,
          drop_console: false
        }
      })
    ]
  }

  return config
}
