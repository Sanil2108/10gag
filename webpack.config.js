var path = require('path');

module.exports = {
    entry: ['babel-polyfill', path.resolve(__dirname, 'src') + '/main/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'src') + '/main/resources/static/built',
        filename: 'bundle.js',
        publicPath: '/app/'
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/react']
                }
            }
        },
        {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
        },
        {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        }]
    },
    mode: 'development',
};