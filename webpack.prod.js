const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg)/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash][ext]'
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        }
      }),
      new CssMinimizerWebpackPlugin()
    ]
  },
  plugins:[
    new GenerateSW({
      swDest: 'sw.js'
    })
  ]
})