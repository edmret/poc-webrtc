const path = require('path');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'background') + '/index.js'
    },
    output: {
      filename: 'background.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: '/\.js$/',
            exclude: '/(node_modules)/',
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }]
        }]
    }
};