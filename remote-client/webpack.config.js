const path = require('node:path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const jsConfig = () => ['@babel/preset-env'];
const tsConfig = () => [...jsConfig(), '@babel/preset-typescript'];

const jsxConfig = () => [...jsConfig(), '@babel/preset-react'];
const tsxConfig = () => [...tsConfig(), '@babel/preset-react'];


const getFileRelativeSrc = (filename = '') => path.resolve(__dirname, `./src/${filename}`);
const getFileRelativePublic = (filename = '') => path.resolve(__dirname, `./public/${filename}`);
const getFileRelativeDist = (filename = '') => path.resolve(__dirname, `./dist/${filename}`);

module.exports = () => {
  return {
    entry: {
      main: getFileRelativeSrc('index.ts'),
    },
    mode: 'development',
    output: {
      path: getFileRelativeDist(),
      filename: '[name].js',
      clean: true,
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devServer: {
      port: 7081,
      allowedHosts: 'all',
      proxy: {
        '/api': 'http://localhost:7300',
      },
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          getFileRelativePublic('index.html'),
        ]
      }),
      new webpack.container.ModuleFederationPlugin({
        name: 'remote',
        filename: 'remoteEntry.js',
        exposes: {
          './RemoteApp': getFileRelativeSrc('app/index.tsx')
        },
        shared: ['react']
      }),
    ],
    module: {
      rules: [
        {
          test: /^bootstrap\.tsx$/,
          loader: 'bundle-loader',
          options: {
            lazy: true
          }
        },
        {
          test: /\.tsx$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: tsxConfig(),
            },
          },
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: tsConfig(),
            },
          },
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: jsxConfig(),
            },
          },
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: jsxConfig(),
            },
          },
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]-[hash:base64:5]',
                  mode: (resourcePath) => {
                    if (/module.css$/i.test(resourcePath)) {
                      return 'local';
                    }
  
                    return 'global';
                  },
                },
              },
            },
          ],
        },
      ],
    },
  }
}