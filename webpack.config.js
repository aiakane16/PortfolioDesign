const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
        publicPath: '/',
    },
    devServer: {
        contentBase: './dist',
        hot:true,
        host: '0.0.0.0',
        port:3000,
        disableHostCheck: true
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                    ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader','css-loader'
                ]
            },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/mystyles.css'
        }),
        new HtmlWebpackPlugin({
            template : './src/index.html'
        })
    ]
}