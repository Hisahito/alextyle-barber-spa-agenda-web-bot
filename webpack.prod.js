const HtmlWebpack = require('html-webpack-plugin')
const MiniCssExtract = require('mini-css-extract-plugin')
const copyPlugin = require('copy-webpack-plugin');

const CssMinimizer = require('css-minimizer-webpack-plugin')
const Terser = require('terser-webpack-plugin')

module.exports = {

    mode: 'production',

    output: {
        clean: true,
        filename: 'main.[contenthash].js'
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
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins: [
        new HtmlWebpack({
            title: 'My webpack app',
            //filename: 'index.html',
            template: './src/index.html'

        }),
        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new copyPlugin({
            patterns: [
             { from: 'src/assets', to: 'assets/' },
            ]
        })
    ]
}