var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'bundles'),

    entry: {
        main: './main/main.js'
    },

    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },

    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style',
                    'css-loader!postcss-loader!stylus-loader')
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('[name].bundle.css'),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.ProvidePlugin({
            fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],

    postcss: [
        autoprefixer
    ]
};
