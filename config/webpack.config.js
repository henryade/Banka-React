const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { config } = require('dotenv');
const { DefinePlugin } = require('webpack');

config();

module.exports = {
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'index_bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: ['file-loader']
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'public' }]),
    new DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(process.env.API_URL),
        API_URL_TEST: JSON.stringify(process.env.API_URL_TEST),
      },
    })
  ]
};
