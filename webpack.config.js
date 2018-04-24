var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './src/search/index.js'
  ],
  output: {
    path: __dirname + '/static/js',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer:{
    contentBase: './public/',
    port: 3000,
    proxy: {
      "/api/**": { target: "https://cimm.kpfu.ru:443/" ,  secure: false }
    }
  }
};