const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function executeCmd(command) {
    let {stdout, stderr} = await exec(command)
    return stdout.trimEnd()
}

function getTranslationCmd({sourceLang, targetLang, word}) {
    return `trans -b ${sourceLang}:${targetLang} ${word}`
}

function getVerbConjugationCmd({verb}) {
    return `german conjugate ${verb} | tail -n +4| sed 's/ \{2,\}/,/g'`
}

module.exports = {
    executeCmd,
    getTranslationCmd,
    getVerbConjugationCmd,
}