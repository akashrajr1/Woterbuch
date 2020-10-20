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

    getTranslateRequest(word) {
        if (!word) throw new Error("Word is Empty")

        let url = this.getUrlWithParams(
            this.baseUrl, {
                key: this.apiAuth.key,
                lang: `${this.sourceLanguage}-${this.targetLanguage}`,
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

        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(xmlData, 'text/xml')
        
        return this.getWord(xmlDoc)
    }

    getWord(xmlDoc) {
        let gender = this.getGender(xmlDoc)
        let noun = this.getNoun(xmlDoc)

        if (!gender) return noun

        switch (this.translationId) {
            case 'de-en': return `${noun} (${gender})`
            case 'en-de': return `${this.getGermanArticle(gender)} ${noun}`
        }

    }

    getGender(xmlDoc) {
        switch (this.translationId) {
            case 'de-en': return xmlDoc.getElementsByTagName('def')[0].getAttribute('gen')
            case 'en-de': return xmlDoc.getElementsByTagName('tr')[0].getAttribute('gen')
        }
    }

    getNoun(xmlDoc) {
        let TRANSLATED_WORD_INDEX = 1
        return xmlDoc.getElementsByTagName('text')[TRANSLATED_WORD_INDEX].innerHTML
    }

    getGermanArticle(gender) {
        let genderArticleMap = {
            m: 'der',
            f: 'die',
            n: 'das',
        }
        return genderArticleMap[gender]
    }
}

module.exports = {
    YandexDictionary,
}