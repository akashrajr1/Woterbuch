const {setResponse, setError, getTenseTranslation, transformShellConjugationResponse} = require('./utils').transformer
const {COMMAND} = require('./utils').cmdTool

// https://github.com/soimort/translate-shell
async function translationAPI(req, res) {
    try {
        let out = await COMMAND.TRANSLATE(req.params)
        setResponse(res, out)
    } catch(err) {
        setError(res)
    }
}

// https://github.com/nicksellen/german
async function verbConjugationAPI(req, res) {
    try {
        await getVerbConjugation(req, res)
    } catch(error) {
        setError(res)
    }
}

async function getVerbConjugation(req, res) {
    let out = await COMMAND.CONJUGATE(req.params)
    let conjugationObject = transformShellConjugationResponse(out)

    let {filter} = req.query
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