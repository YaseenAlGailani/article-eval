const path = require('path')
const {merge} = require('webpack-merge')
const common = require('./webpack.common')


module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean:true
    },
    module:{
        rules:[
            {
                test: /\.(png|svg|jpg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            }
        ]
    },
    devServer: {
        watchFiles: ["./src/client/*"],
        port: 8080,
        hot: true,
    },
})