const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const { VueLoaderPlugin } = require('./loaders/vue-loader')
console.log('VueLoaderPlugin', VueLoaderPlugin)

module.exports = {
  mode: 'development',
  entry: './index.js',
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.vue$/,
        use: [
          path.resolve(__dirname, './loaders/vue-loader/index.js'),
          // path.resolve(__dirname, './loaders/loader0'),
          // path.resolve(__dirname, './loaders/loader1'),
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true
    })
  ]
}