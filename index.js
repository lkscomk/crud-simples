// importacao de pacotes
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const consign = require('consign')
const knex = require('knex')
const config = require('./src/config/db')

//  instaciação de vairavel app
const app = express()

// ferramentas utilizadas no app
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))

// configurações do banco de dados
const database = knex(config)
app.db = database

// carregar pastas para variavel global
consign()
  .include('./src/controller')
  .include('./src/auth')
  .include('./src/router')
  .into(app)

// Inicialização do serviço
app.listen(process.env.APP_PORT, () => {
  console.log(`Rodando na porta ${process.env.APP_PORT}`)
})
