const express = require('express')
const API = require('./controller')

const app = express()
const {SERVER_PORT} = require('../config')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.get('/', (req, res) => {
    res.end('healthy');
})

app.get('/:sourceLang-:targetLang/:word', async (req, res) => {
    API.translation(req, res)
})

app.get('/de/:verb', async (req, res) => {
    API.verbConjugation(req, res)
})

app.listen(SERVER_PORT, () => {
  console.log(`Running Woterbuch @ http://localhost:${SERVER_PORT}`)
})
