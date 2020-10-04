const {BaseDictionary} = require('./BaseDictionary')

class YandexDictionary extends BaseDictionary{
    constructor() {
        super({
            baseUrl: 'https://dictionary.yandex.net/api/v1/dicservice/lookup',
            apiAuth: {
                key: process.env.YANDEX_DICTIONARY_API_KEY,
            }
        })
    }

    getTranslateRequest(word, sourceLanguage, targetLanguage) {
        if (!word) throw new Error("Word is Empty")

        let url = this.getUrlWithParams(
            this.baseUrl, {
                key: this.apiAuth.key,
                lang: `${sourceLanguage}-${targetLanguage}`,
                text: word
            }
        )
        let init = {
            method: 'GET'
        }

        return new Request(url, init)
    }

    async getTranslateResponse(request) {
        let xmlData = await fetch(request)
                        .then(res => res.text())
                        .then(str => $.parseXML(str))
        let TRANSLATED_WORD_INDEX = 1
        return $(xmlData)
                .find('text')
                .filter((index) => index == TRANSLATED_WORD_INDEX)
                .text()
    }
}

module.exports = {
    YandexDictionary,
}