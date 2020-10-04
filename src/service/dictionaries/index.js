const {YandexDictionary} = require('./YandexDictionary')

function getDictionary() {
    return new YandexDictionary()
}

module.exports = {
    getDictionary
}