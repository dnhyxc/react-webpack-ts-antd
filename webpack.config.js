const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/, // jsx/js文件的正则
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use: {
          // loader 是 babel
          loader: 'babel-loader',
          options: {
            // babel 转义的配置选项
            babelrc: false,
            presets: [
              // 添加 preset-react
              require.resolve('@babel/preset-react'),
              [
                require.resolve('@babel/preset-env'),
                {
                  modules: false
                }
              ]
            ],
            cacheDirectory: true
          }
        }
      },
      // {
      //   test: /\.tsx?$/, loader: "awesome-typescript-loader"
      // },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ["@babel/env", "@babel/react", '@babel/preset-typescript'],
            plugins: [
              ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
            ]
          }
        }]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader']
      },
      {
        test: /\.svg$/,
        use: ['raw-loader']
      },
      {
        test: /\.svg/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './public/index.html'),
    }),
  ],
  externals: {
    // "react": "React",
    // "react-dom": "ReactDOM"
  },
  mode: 'development',
  devServer: {
    port: 9200,
    disableHostCheck: true,
    historyApiFallback: true,
  }
};