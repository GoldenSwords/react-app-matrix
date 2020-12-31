// 生产环境的 webpack 配置

const path = require('path');

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/assets/',
    chunkFilename: '[name].[contenthash].js',
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    alias: {
      src: path.resolve(__dirname, './src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.worker\.ts$/, // 以.worker.ts结尾的文件将被worker-loader加载
        use: [
          {
            loader: 'worker-loader',
            options: {
              name: 'worker.[hash].js',
              publicPath: '/assets/',
            },
          },
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
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
      },
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
};
