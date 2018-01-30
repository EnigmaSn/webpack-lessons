const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build')
};
module.exports = {
  entry: PATH.source + '/index.js',
  output: {
    path: PATH.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PATH.source + '/index.pug'
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      }
    ]
  }
};