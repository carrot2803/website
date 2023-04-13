const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    index: './src/index.js',
    sandbox: './src/js/functions/sandbox.js',
    chat: './src/js/functions/chat.js',
    menu: './src/js/functions/menu.js',
    post: './src/js/functions/post.js',
    search: './src/js/functions/search.js',
    avatar: './src/js/functions/avatar.js',
    left: './src/js/functions/left.js',
    userlogin: './src/js/functions/userlogin.js',
    comments: './src/js/functions/comments.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new BundleAnalyzerPlugin()
  ]
};
