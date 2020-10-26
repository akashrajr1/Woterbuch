const {YandexDictionary} = require('./YandexDictionary')
const {LocalDictionary} = require('./LocalDictionary')

function getDictionary() {
    return new YandexDictionary()
}

function getLocalDictionary() {
    return new LocalDictionary()
}

module.exports = {
    getDictionary,
    getLocalDictionary,
}