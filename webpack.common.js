const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/client/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }, 
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.html$/i,
                use: ['html-loader']
            }
        ]
    },
    plugin: [
        new HtmlWebpackPlugin({
            template:'./src/client/index.html'
        }),
        new MiniCssExtractPlugin()
    ]
}

//js -> entry point, babel, tetzer(built in)
//css -> sass-loader, css-loader, MiniCssExtractPlugin.loader
//images ->assets