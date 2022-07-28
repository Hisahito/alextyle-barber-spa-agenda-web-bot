const HtmlWebpack = require('html-webpack-plugin')
const MiniCssExtract = require('mini-css-extract-plugin')
const copyPlugin = require('copy-webpack-plugin');

module.exports = {

    mode: 'development',

    output: {
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /style.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /style.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test : /\.(png|jpg?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/img/[name].[ext]',
                }
            }
        ]
    },
    optimization: {},

    plugins: [
        new HtmlWebpack({
            title: 'My webpack app',
            //filename: 'index.html',
            template: './src/index.html'

        }),
        new MiniCssExtract({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new copyPlugin({
            patterns: [
             { from: 'src/assets', to: 'assets/' },
            ]
        })
    ]
}