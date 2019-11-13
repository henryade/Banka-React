const merge = require('webpack-merge');
const path = require('path');
const Webpack = require('webpack');
const common = require('./webpack.config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    publicPath: '/',
    hot: true,
    port: 8080,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
    },
    proxy: {
      '/api/v1/*': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      }
    }
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ]
});
