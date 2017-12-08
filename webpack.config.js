const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'; // true or false

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.join(__dirname, 'src/index.html'),
  minify: {
    collapseWhitespace: isProd
  },
  hash: true
});

const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: 'main.css',
  allChunks: true,
  disable: false
});

const CleanWebpackPluginConfig = new CleanWebpackPlugin(['dist']);
const OpenBrowserPluginConfig = new OpenBrowserPlugin({ url: 'http://localhost:3000' });
const HotModuleReplacement = new webpack.HotModuleReplacementPlugin();

const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: '/'
});
const cssConfig = isProd ? cssProd : cssDev;

const getPlugins = () => {
  const addPlugins = isProd ? [CleanWebpackPluginConfig, ExtractTextPluginConfig] : [OpenBrowserPluginConfig, HotModuleReplacement];
  const plugins = [HtmlWebpackPluginConfig, ...addPlugins];
  return plugins;
}

module.exports = {
  entry: {
    app: ['react-hot-loader/patch', path.join(__dirname, 'src/js/index.js'), 'webpack-hot-middleware/client']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [['env', { modules: false }], 'react'],
              plugins: ["react-hot-loader/babel", "transform-class-properties"]
            }
          }
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000
  },
  plugins: getPlugins()
}
