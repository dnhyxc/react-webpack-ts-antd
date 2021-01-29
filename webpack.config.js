const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },

  // 生产模式下关闭map文件
  // devtool: devMode ? "none" : "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.css|less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  "primary-color": "#009688",
                  "menu-item-active-bg": "#009688",
                },
                javascriptEnabled: true,
              }
            }
          }
        ]
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
      },
      // isPro ? null : {
      //   enforce: "pre",
      //   test: /\.js|ts|tsx$/,
      //   loader: "source-map-loader"
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './public/index.html'),
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 移除空格
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
  ],
  externals: {
    // "react": "React",
    // "react-dom": "ReactDOM"
  },
  // mode: 'production',
  mode: 'development',
  devServer: {
    port: 9200,
    disableHostCheck: true,
    historyApiFallback: true,
  }
};