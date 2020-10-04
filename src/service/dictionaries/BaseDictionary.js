class BaseDictionary {
    constructor({baseUrl, apiAuth}) {

        // Singleton
        if (BaseDictionary._instance) {
            return BaseDictionary._instance
        }
        BaseDictionary._instance = this;

        this.baseUrl = baseUrl
        this.apiAuth = apiAuth
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
        let request = this.getTranslateRequest(word, sourceLanguage, targetLanguage)
        return this.getTranslateResponse(request)
    }
}

module.exports = {
    BaseDictionary,
}