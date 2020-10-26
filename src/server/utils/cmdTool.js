const util = require('util');
const exec = util.promisify(require('child_process').exec);

let COMMAND = {
    TRANSLATE: execTranslationCmd,
    CONJUGATE: execVerbConjugationCmd,
}

function execTranslationCmd({sourceLang, targetLang, word}) {
    return executeCmd(
        `trans -b ${sourceLang}:${targetLang} ${word}`
    )
}

function execVerbConjugationCmd({verb}) {
    return executeCmd(
        `german conjugate ${verb} | tail -n +4| sed 's/ \{2,\}/,/g'`
    )
}

async function executeCmd(command) {
    let {stdout, stderr} = await exec(command)
    return stdout.trimEnd()
}

module.exports = {
    COMMAND,
}