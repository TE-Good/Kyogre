// Module for CLI
const mongoose = require('mongoose')
const inquirer = require('inquirer')
const moment = require('moment')
require('dotenv').config()

const Quote = require('./model')
const { getDatabaseInfo } = require('./enviro')

const URI = getDatabaseInfo()
const tenet = `
TENET
=====
${process.env.TENET.split('/ ').join('\n')}
`

// Controllers
async function quoteOfTheDay() {
  const quotes = await Quote.find()
  const quoteOfTheDay = quotes[moment().format('DDD') % quotes.length]
  return `
    ${quoteOfTheDay.quote}
  
    - ${quoteOfTheDay.author}
  `
}

async function randomQuote() {
  const quotes = await Quote.find()
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  return `
    ${randomQuote.quote}
  
    - ${randomQuote.author}
  `
}

async function getTenet() {
  const tenetPrompt = await inquirer.prompt({
    type: 'password',
    name: 'password',
    message: 'Provide password:'
  })
  
  return tenetPrompt.password === process.env.PASSWORD ? tenet : 'Incorrect password.'
}

async function selectedOutput() {
  const question = await inquirer.prompt({
    type: 'list',
    name: 'nav',
    message: 'Select output:',
    choices: ['quote of the day', 'random quote', 'tenet', 'exit']
  })
  
  if (question.nav === 'quote of the day') return quoteOfTheDay()
  if (question.nav === 'random quote') return randomQuote()
  if (question.nav === 'tenet') return getTenet()
  if (question.nav === 'exit') return 'exit'
  else return 'Incorrect input. Closing..'
}

async function runInteractiveKyogre() {
  while (true) {
    output = await selectedOutput()
    if (output === 'exit') return
    console.log(output)
  }
}

mongoose.connect(URI.URI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
  if (err) return console.log('initial:', err)
  console.log(`
  ____  __.                                   
  |    |/ _|___.__. ____   ___________   ____  
  |      < <   |  |/  _ \\ / ___\\_  __ \\_/ __ \\ 
  |    |  \\ \\___  (  <_> ) /_/  >  | \\/\\  ___/ 
  |____|__ \\/ ____|\\____/\\___  /|__|    \\___  >
  \\/\\/          /_____/             \\/
  `)
  
  console.log('\nWelcome to Kyogre.\n')
  await runInteractiveKyogre()
  mongoose.connection.close()
})
