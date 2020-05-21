// Module for CLI
const inquirer = require('inquirer')
const moment = require('moment')
require('dotenv').config()

const quotes = require('./quotes')

// Tenet
const tenet = `
TENET
=====
${process.env.TENET.split('/ ').join('\n')}
`

// Quote
function quoteOfTheDay() {
  const quoteOfTheDay = quotes.quotes[moment().format('DDD') % quotes.quotes.length]
  return `
    ${quoteOfTheDay.quote}
  
    - ${quoteOfTheDay.author}
  `
}

// Random quote
function randomQuote() {
  const randomQuote = quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)]
  return `
    ${randomQuote.quote}
  
    - ${randomQuote.author}
  `
}

// Creates and handles the prompt and its output values
async function input() {
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

async function getTenet() {
  const tenetPrompt = await inquirer.prompt({
    type: 'password',
    name: 'password',
    message: 'Provide password:'
  })

  return tenetPrompt.password === process.env.PASSWORD ? tenet : 'Incorrect password.'
}

// Prints the values from the prompt
async function cli() {
  let answer = null
  while (answer !== 'exit') {
    answer = await input()
    if (answer === 'exit') return
    console.log(answer)
  }
}

console.log(`
    ____  __.                                   
    |    |/ _|___.__. ____   ___________   ____  
    |      < <   |  |/  _ \\ / ___\\_  __ \\_/ __ \\ 
    |    |  \\ \\___  (  <_> ) /_/  >  | \\/\\  ___/ 
    |____|__ \\/ ____|\\____/\\___  /|__|    \\___  >
            \\/\\/          /_____/             \\/
        `)

console.log('\nWelcome to Kyogre.\n')
cli()