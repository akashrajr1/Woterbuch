function setResponse(res, out) {
    res.end(JSON.stringify({ data: out }))
}

function setError(res) {
    res.status(500)
    res.end(JSON.stringify({data: null}))
}

function transformShellConjugationResponse(text) {
    text = text.split('\n').filter(x => x.length != 0)
    let pronouns = [
        'ich',
        'du',
        'er/sie/es',
        'wir/sie/Sie',
        'ihr',
    ]
    let conjugations = {}
    text.forEach(data => {
        data = data.replace(/  +/g, ',').split(',').filter(x => x.length != 0)
        let verb = data.shift()
        let tense = data.shift()
        conjugations[tense] = {}
        let ref = conjugations[tense]

        for (i=0; i<pronouns.length; i++) {
            ref[pronouns[i]] = data[i]
        }
    })
    if (Object.keys(conjugations).length == 0) return null
    return conjugations
}

function getTenseTranslation(tense) {
    let tenseMap = {
        present: 'präsens',
        past: 'präteritum',
        perfect: 'perfekt',
        future: 'futur1',
        'present-perfect': 'k2präsens',
        'past-perfect': 'k2präteritum',
    }
    if (tense in tenseMap) return tenseMap[tense]
    return null
}


module.exports = {
    setResponse,
    setError,
    transformShellConjugationResponse,
    getTenseTranslation,
}