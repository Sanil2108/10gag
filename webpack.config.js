var path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
    // call dotenv and it will return an Object with a parsed key 
    // dotenv.config({ path: '/home/sanil/Documents/10gag/.env.development' });
    const env = dotenv.config().parsed;
    // const env = dotenv.parsed;
    
    // reduce it to a nice object, the same as before
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        node: {
            fs: "empty"
        },
        plugins: [
            new webpack.DefinePlugin(envKeys)
        ],
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
    }
}