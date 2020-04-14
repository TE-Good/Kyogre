const inquirer = require('inquirer')
const moment = require('moment')

const { quotes, tenet } = require('../../quotes')

// console.log('the number of quotes I have are', quotes.length)
// console.log('the day in the year is', moment().format('DDD'))

const quote = quotes[moment().format('DDD') % quotes.length - 1]
const quoteOfTheDay = `
  ${quote.quote}

  - ${quote.author}
`

// Creates and handles the prompt and its output values
async function main() {
  // LIST VERSION
  const question = await inquirer.prompt({
    type: 'list',
    name: 'nav',
    message: 'Select output:',
    choices: ['tenet', 'quote', 'exit']
  })

  // TYPED VERSION
  // const question = await inquirer.prompt({
  //   name: 'nav',
  //   message: 'Do you want your tenet or a quote?'
  // })

  // OUTPUT
  if (question.nav === 'quote') return quoteOfTheDay
  if (question.nav === 'tenet') return tenet
  if (question.nav === 'exit') return 'exit'
  else return 'Incorrect input. Closing..'
}

// Prints the values from the prompt
async function cli() {
  let answer = null
  while (answer !== 'exit') {
    answer = await main()
    if (answer === 'exit') return
    console.log(answer)
  }
}

module.exports = { cli }