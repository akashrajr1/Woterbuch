const {setResponse, setError, getTenseTranslation, transformShellConjugationResponse} = require('./utils').transformer
const {executeCmd, getTranslationCmd, getVerbConjugationCmd} = require('./utils').cmdTool

// https://github.com/soimort/translate-shell
async function translationAPI(req, res) {
    try {
        let out = await executeCmd(getTranslationCmd(req.params))
        setResponse(res, out)
    } catch(err) {
        setError(res)
    }
}

// https://github.com/nicksellen/german
async function verbConjugationAPI(req, res) {
    try {
        await getVerbConjugation(res, req)
    } catch(error) {
        setError(res)
    }
}

async function getVerbConjugation(res, req) {
    let out = await executeCmd(getVerbConjugationCmd(req.params))

    let {filter} = req.query

    let conjugationObject = transformShellConjugationResponse(out)
    if (!filter) setResponse(res, conjugationObject)

    let response = {}
    filter.split(',').forEach(tense => {
        tense = getTenseTranslation(tense)
        if (tense) response[tense] = conjugationObject[tense]
    })

    if (Object.keys(response).length == 0) setResponse(res, conjugationObject)
    setResponse(res, response)
}

module.exports = {
    translation: translationAPI,
    verbConjugation: verbConjugationAPI,
}