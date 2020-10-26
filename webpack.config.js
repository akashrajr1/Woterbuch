const webpack = require('webpack')
const path = require('path')

const DIR = './src/client'
module.exports = {
    entry: `${DIR}/popup.js`,
    output: {
        filename: 'popup.js',
        path: path.resolve(__dirname, `${DIR}/dist`),
    },
    mode: 'production',
    plugins: [
        new webpack.EnvironmentPlugin([
            'YANDEX_DICTIONARY_API_KEY'
        ])
    ],
}