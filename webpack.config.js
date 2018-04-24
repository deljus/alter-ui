var webpack = require('webpack');
var path = require('path');

var publicPath = 'http://localhost:4000';

module.exports = {
  entry: {
    search: [
      'babel-polyfill',
      './src/search/index.js',
      // 'webpack-dev-server/client&http://localhost:3000',
      'webpack/hot/only-dev-server'
    ],
    predictor: [
      'babel-polyfill',
      './src/predictor/index.js',
      // 'webpack-dev-server/client&http://localhost:3000',
      'webpack/hot/only-dev-server'
    ],
  },
  output: {
    path: path.join(__dirname, "public/dist"),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: [ "es2017", "react", "react-hmre" ]
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer:{
    hot: true,
    open: true,
    contentBase: './public/',
    port: 3000,
    proxy: {
      "/api/**": { target: "https://cimm.kpfu.ru:443/" ,  secure: false }
    }
  }
};