const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // mode - 
    // development ( or "" and is used to test locally for errors) 
    // production ( strict compression of code without checking for errors)
    mode: 'production',
    // entry 
    // input files
    entry: {
        main: path.resolve(__dirname, 'src/App.js'),
    },
    // output 
    // output bundle file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 5001,
        open: true,
        hot: true, // checks for any changes in code and complies
    },
    // loaders
    // convert non js files to modules that can be imported by js
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ]
    },
    // plugins
    // can create new files or use already exisiting templates
    plugins: [new htmlWebpackPlugin({
        title: "test title",
        filename: "index.html",
        template: path.resolve(__dirname, 'src/main.html'),
    })]
}