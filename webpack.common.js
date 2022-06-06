const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')

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
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [postcssPresetEnv()],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.html$/i,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/client/views/index.html'
        }),
        new MiniCssExtractPlugin()
    ]
}

//js -> entry point, babel, tetzer(built in)
//css -> sass-loader, css-loader, MiniCssExtractPlugin.loader
//images ->assets