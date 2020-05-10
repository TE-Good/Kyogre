const inquirer = require('inquirer')
const moment = require('moment')
require('dotenv').config()

const quotes = require('./quotes')

// Tenet
const tenet = process.env.TENET.split('/ ').join('\n')

// Quote
function QuoteOfTheDay() {
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
  // LIST VERSION
  const question = await inquirer.prompt({
    type: 'list',
    name: 'nav',
    message: 'Select output:',
    choices: ['quote of the day', 'random quote', 'tenet', 'exit']
  })

  // TYPED VERSION
  // const question = await inquirer.prompt({
  //   name: 'nav',
  //   message: 'Do you want your tenet or a quote?'
  // })

  // OUTPUT
  if (question.nav === 'quote of the day') return QuoteOfTheDay()
  if (question.nav === 'random quote') return randomQuote()
  if (question.nav === 'tenet') return tenet
  if (question.nav === 'exit') return 'exit'
  else return 'Incorrect input. Closing..'
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

console.log('\nWelcome to Kyogre \n')
cli()