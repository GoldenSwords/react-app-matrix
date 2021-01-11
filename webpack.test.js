// 生产环境的 webpack 配置

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/',
    chunkFilename: '[name].[contenthash].js',
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    alias: {
      src: path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
      'gifModule': path.resolve(__dirname, 'node_modules/gif.js/dist'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: [
          'source-map-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|cur|woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.worker\.ts$/, // 以.worker.ts结尾的文件将被worker-loader加载
        use: [
          'worker-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|cur|woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  // 阻止在多个编译好的文件中包含同样的包
  optimization: {
    minimizer: [
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      title: 'Demo',
    }),
  ]
};
