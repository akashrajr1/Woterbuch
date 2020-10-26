# Wöterbuch v0.1.0

Copyright (c) 2020 Akashraj R

A chrome extension for German-English & English-German translations
APIs from [Yandex](https://yandex.com/)

### Motivation

I recently started learning German on the side, and I couldn't find a chrome extension which solved my needs for German Translations. So, I decided to build my own 🤷‍♂️

### Deployment Instructions


* Get a API key from [Yandex Dev](https://yandex.com/dev/keys/) and `export YANDEX_DICTIONARY_API_KEY=XXXXX`
```
npm install
npm run build
npm run install-tools
npm run server
```
* Go to [chrome://extensions/](chrome://extensions/) and switch on Developer Mode if not done already
* Click `Load Unpacked` and load `/src/client`
* Shortcuts are `Cmd+D` or `Ctrl+D`

### Development Instructions

* Use `.js` files from webpack `/src/client/dist`

### Roadmap/Ideas

- [ ] Multi Language Support
- [ ] AutoComplete Feature
- [ ] Integrate this [Dictionary API](https://www.openthesaurus.de/synonyme/search?q=hund&format=application/json) (for advanced usage)
- [x] German Verb Conjugation
- [ ] Local Storage
- [ ] UI Changes for Verb Conjugation

### Security

Wöterbuch is security compliant with this [contentSecurityPolicy](https://developer.chrome.com/extensions/contentSecurityPolicy)

### History

Check the [Chanelog](https://github.com/akashrajr1/Woterbuch/blob/master/Changelog.md)


### Copyright and License Information

Copyright (c) 2020 Akashraj R
[License](https://github.com/akashrajr1/Woterbuch/blob/master/LICENSE)
