const {BaseDictionary} = require('./BaseDictionary')

class LocalDictionary extends BaseDictionary{
    constructor() {
        super({
            baseUrl: 'http://localhost:3000',
        })
    }

    getTranslateRequest(word) {
        if (!word) throw new Error("Word is Empty")

        let translationUrl = [
            this.baseUrl,
            `${this.sourceLanguage}-${this.targetLanguage}`,
            word,
        ].join('/')
        let init = {
            method: 'GET'
        }

        return new Request(translationUrl, init)
    }

    async getTranslateResponse(request) {
        try {
            let data = await fetch(request).then(res => res.json())
            return data.data
        } catch(err) {
            return null
        }
    }

}

module.exports = {
    LocalDictionary,
}