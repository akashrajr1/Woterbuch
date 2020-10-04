const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: './src/popup.js',
    output: {
        filename: 'popup.js',
        path: path.resolve(__dirname, 'src/dist'),
    },
    mode: 'production',
    plugins: [
        new webpack.EnvironmentPlugin([
            'YANDEX_DICTIONARY_API_KEY'
        ])
    ],
}