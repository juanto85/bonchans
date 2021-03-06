var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')


module.exports = {
  context: __dirname,
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './apps/static/js/index'
  ],

  output: {
    path: path.resolve('./apps/static/bundles'),
    filename: '[name]-[hash].js',
    publicPath: 'http://localhost:3000/static/bundles', //Tell django to use this url
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(), //Dont reload if there is an error
    new BundleTracker({filename: '.webpack-stats.json'}),
  ],

  module: {
    loaders: [
      //we pass the output from babel loader to react-hot-loader
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'], },
    ],
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  }
}
