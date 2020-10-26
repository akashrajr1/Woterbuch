class BaseDictionary {
    constructor({baseUrl, apiAuth}) {
        this.baseUrl = baseUrl
        this.apiAuth = apiAuth
        this.sourceLanguage = null
        this.targetLanguage = null
    }

    get translationId() {
        return `${this.sourceLanguage}-${this.targetLanguage}`
    }

    getUrlWithParams(url, params) {
        let searchParams = new URLSearchParams(params)
        return `${url}?${searchParams.toString()}`
    }

    getTranslateRequest(word, sourceLanguage, targetLanguage) {
        throw new("Override me!")
    }

    async getTranslateResponse(request) {
        let response = await fetch(request)
        throw new("Override me!")
    }

    async translateWord(word, sourceLanguage, targetLanguage) {
        this.sourceLanguage = sourceLanguage
        this.targetLanguage = targetLanguage

        let request = this.getTranslateRequest(word)
        return this.getTranslateResponse(request)
    }
}

module.exports = {
    BaseDictionary,
}