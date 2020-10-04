const {getDictionary} = require('./service/dictionaries')

const SOURCE = {
    INPUT_SELECTOR: '#sourceText',
    LANGUAGE: 'de',
}

const TARGET = {
    INPUT_SELECTOR: '#targetText',
    LANGUAGE: 'en'
}

function translateSourceWord(event) {
    if (event.code != 'Enter') return

    let sourceInput = $(SOURCE.INPUT_SELECTOR)
    let targetInput = $(TARGET.INPUT_SELECTOR)

    let word = sourceInput.val()
    getDictionary()
        .translateWord(word, SOURCE.LANGUAGE, TARGET.LANGUAGE)
        .then(translation => targetInput.val(translation))
}

function translateTargetWord(event) {
    if (event.code != 'Enter') return

    let sourceInput = $(SOURCE.INPUT_SELECTOR)
    let targetInput = $(TARGET.INPUT_SELECTOR)

    let word = targetInput.val()
    getDictionary()
        .translateWord(word, TARGET.LANGUAGE, SOURCE.LANGUAGE)
        .then(translation => sourceInput.val(translation))
}

function autoComplete() {
    // console.log($(this).val())
}

document.addEventListener('DOMContentLoaded', function () {

    document.querySelector(SOURCE.INPUT_SELECTOR).addEventListener('keydown', translateSourceWord)
    document.querySelector(TARGET.INPUT_SELECTOR).addEventListener('keydown', translateTargetWord)
})