const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
    mnode: 'production',
    output:{
        filename: 'main.[contentHash].js',
        path: path.resolve(__dirname, 'dist'),
        clean:'true'
    },
    module:{
        rules:[
            {
                test: /\.(png|svg|jpg)/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[hash][ext]'
                }
            }
        ]
    },
    optimization: {
        minimizer:[
            '...',
            new CssMinimizerWebpackPlugin()
        ]
    }
})