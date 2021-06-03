const path = require('path')
 
module.exports = {
    entry: './src/main.js',
    
    output: {
        filename: 'select.js',
        path: path.resolve(__dirname, './select'),
        environment: {
            arrowFunction: false,
        }
    },
    mode: 'production',
    module: {
        rules : [
            {
                test : /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    },
                },
                exclude: /node_modules/,
            }
        ]
    }
};