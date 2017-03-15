import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import StatsWebpackPlugin from 'stats-webpack-plugin';

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

export default {
  context: path.resolve(__dirname, '..'),
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name]-[hash].min.js'
  },
  resolve: {
    modules: [
        resolve('src'),
        resolve('node_modules')
    ],
    alias: {
      'Container': 'helpers/Container'
    },
    extensions: [
      '.js',
      '.jsx',
      '.json'
    ]
  },
  module: {
    rules: [
      {
        test: /\.html?$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            "presets": [["es2015", {"modules": false}]]
        }
      },
      {
        test: /node_modules/,
        loader: 'ify-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use : [{
            loader: 'css-loader',
            options: {
                plugins: function () {
                    return [
                        require('autoprefixer')({ browsers: 'last 2 versions' })
                    ];
                }
            }
          }]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                  plugins: function () {
                      return [
                          require('autoprefixer')({ browsers: 'last 2 versions' })
                      ];
                  }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                  plugins: function () {
                      return [
                          require('autoprefixer')({ browsers: 'last 2 versions' })
                      ];
                  }
              }
            }]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': JSON.stringify(false),
      '__PROD__': JSON.stringify(true)
    }),
    new webpack.ProvidePlugin({
      'Vue': 'vue'
    }),
    new CopyWebpackPlugin([
      { from: 'static' }
    ],
    { ignore: ['.DS_Store', '.keep'] }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
        drop_console: true,
        pure_funcs: ['console.log']
      }
    }),
    new ExtractTextPlugin({
      filename : '[name]-[hash].min.css',
      allChunks: true
    }),
    new CleanWebpackPlugin(['dist'], { root: path.join(__dirname, '..') }),
    new StatsWebpackPlugin('webpack.stats.json')
  ]
};