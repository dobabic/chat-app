const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    runtimeChunk: 'single',
  },
  entry: {
    main: path.resolve(__dirname, 'src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
    },
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      Context: path.resolve(__dirname, 'src/context'),
      Utilities: path.resolve(__dirname, 'src/firebase-utils'),
      Config: path.resolve('/firebase-config.js'),
      Assets: path.resolve(__dirname, 'src/assets'),
      Routes: path.resolve(__dirname, 'src/routes'),
      MessageTypes: path.resolve(__dirname, 'src/components/Chatter/MessageTypes'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpeg|jpg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React-msg-app',
      filename: 'index.html',
      template: 'src/template.html',
    }),
  ],
};
