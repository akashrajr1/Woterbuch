const {getDictionary, getLocalDictionary} = require('./dictionaries')
const {SOURCE, TARGET} = require('../config').LANGUAGE
const {SERVER_PORT} = require('../config')

function setSourcePlaceHolder(event) {
    $(SOURCE.INPUT_SELECTOR).attr('placeholder', SOURCE.LANGUAGE_FULL)
    $(TARGET.INPUT_SELECTOR).attr('placeholder', TARGET.LANGUAGE_FULL)
}

async function translateSourceWord(event) {
    if (event.code != 'Enter') return

    let sourceInput = $(SOURCE.INPUT_SELECTOR)
    let targetInput = $(TARGET.INPUT_SELECTOR)

    let word = sourceInput.val().split(' ').pop()

    let promises = [
        getDictionary().translateWord(word, SOURCE.LANGUAGE_CODE, TARGET.LANGUAGE_CODE),
        getVerbConjugation(word),
        getLocalDictionary().translateWord(word, SOURCE.LANGUAGE_CODE, TARGET.LANGUAGE_CODE),
    ]

    promises = await Promise.all(promises)

    let translatedWord = promises[0]
    if (!translatedWord) translatedWord = promises[2]

    targetInput.val(translatedWord)
}

async function translateTargetWord(event) {
    if (event.code != 'Enter') return

    let sourceInput = $(SOURCE.INPUT_SELECTOR)
    let targetInput = $(TARGET.INPUT_SELECTOR)

    let word = targetInput.val()

    let promises = [
        getDictionary().translateWord(word, TARGET.LANGUAGE_CODE, SOURCE.LANGUAGE_CODE),
        getVerbConjugation(word),
        getLocalDictionary().translateWord(word, TARGET.LANGUAGE_CODE, SOURCE.LANGUAGE_CODE),
    ]

    promises = await Promise.all(promises)

    let translatedWord = promises[0]
    if (!translatedWord) translatedWord = promises[2]

    sourceInput.val(translatedWord)
}

async function getVerbConjugation(verb) {
    $(".table").empty()
    try {
        let tenses = ['present']
        let url = `http://localhost:${SERVER_PORT}/${SOURCE.LANGUAGE_CODE}/${verb}?filter=${tenses.join(',')}`
        let data = await fetch(url).then(res =>res.json())
        createVerbConjugationTable(data.data)
    } catch(err) {}
}

function createVerbConjugationTable(data) {
    if (!data) return
    let tenses = Object.keys(data)
    $(".table").append(`<thead><tr id="headings"></tr></thead>`)
    $('#headings').append(`<th scope="col"></th>`)
    tenses.forEach(tense => {
        $('#headings').append(`<th scope="col">${tense}</th>`)
    })

    $(".table").append(`<tbody id="tableBody"></tbody>`)
    let pronouns = ['ich', 'du', 'er/sie/es', 'ihr', 'wir/sie/Sie']
    pronouns.forEach(pronoun => $("#tableBody").append(`<tr id="${pronoun.split('/').join('-')}"><th scope="col">${pronoun}</th></tr>`))

    tenses.forEach(tense => {
        let conjugations = data[tense]
        Object.keys(conjugations).forEach(pronoun => $(`#${pronoun.split('/').join('-')}`).append(`<td>${conjugations[pronoun]}</td>`))
    })

}

document.addEventListener('DOMContentLoaded', function () {

    window.addEventListener('load', setSourcePlaceHolder)
    document.querySelector(SOURCE.INPUT_SELECTOR).addEventListener('keydown', translateSourceWord)
    document.querySelector(TARGET.INPUT_SELECTOR).addEventListener('keydown', translateTargetWord)
})